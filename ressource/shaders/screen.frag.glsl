// File: shaders/screen.frag.glsl

precision mediump float;

uniform sampler2D u_game;
uniform sampler2D u_ui;

uniform vec2 u_resolution;
uniform vec2 u_gameResolution;

uniform float u_time;

uniform vec2 u_offset;
uniform float u_scale;

varying vec2 v_uv;


/*
 * GAME.
 */
const float GAME_CONTRAST = 1.1;
const float GAME_SATURATION = 1.15;
const float GAME_BRIGHTNESS = 0.92;


/*
 * UI.
 */
const float UI_CONTRAST = 1.05;
const float UI_SATURATION = 0.95;
const float UI_BRIGHTNESS = 1.08;


/*
 * CRT.
 */
const float SCANLINE_STRENGTH = 0.045;
const float SCANLINE_SIZE = 3.0;

const float GRAIN_STRENGTH = 0.015;

const float VIGNETTE_STRENGTH = 0.22;
const float VIGNETTE_INNER = 0.25;
const float VIGNETTE_OUTER = 0.78;


/*
 * Courbure CRT.
 *
 * 0.0 = aucune courbure.
 * Environ 0.05 - 0.12 donne généralement de bons résultats.
 */
const float CRT_CURVATURE = 0.015;


/*
 * Aberration chromatique.
 *
 * Décalage RGB exprimé en pixels approximatifs.
 */
const float CHROMATIC_ABERRATION = 0.55;


/*
 * L'aberration augmente vers les bords.
 */
const float CHROMATIC_EDGE_POWER = 1.60;


/*
 * Glow/blur du jeu.
 */
const float GAME_BLUR_MIX = 0.10;
const float GAME_BLUR_CONTRAST = 1.40;


float random(vec2 p) {
    return fract(
        sin(
            dot(
                p,
                vec2(12.9898, 78.233)
            )
        ) * 43758.5453
    );
}


vec3 adjustContrast(
    vec3 color,
    float contrast
) {
    return (color - 0.5) * contrast + 0.5;
}


vec3 adjustSaturation(
    vec3 color,
    float saturation
) {
    float luminance = dot(
        color,
        vec3(
            0.2126,
            0.7152,
            0.0722
        )
    );

    return mix(
        vec3(luminance),
        color,
        saturation
    );
}


vec3 adjustBrightness(
    vec3 color,
    float brightness
) {
    return color * brightness;
}


vec3 applyColorCorrection(
    vec3 color,
    float contrast,
    float saturation,
    float brightness
) {
    color = adjustContrast(
        color,
        contrast
    );

    color = adjustSaturation(
        color,
        saturation
    );

    color = adjustBrightness(
        color,
        brightness
    );

    return color;
}


bool isOutsideUv(vec2 uv) {
    return (
        uv.x < 0.0 ||
        uv.x > 1.0 ||
        uv.y < 0.0 ||
        uv.y > 1.0
    );
}


vec2 applyCrtCurvature(vec2 uv) {
    vec2 centered = uv * 2.0 - 1.0;

    vec2 offset = centered.yx * centered.yx;

    centered += centered * offset * CRT_CURVATURE;

    return centered * 0.5 + 0.5;
}


vec4 sampleGame(vec2 uv) {
    if (isOutsideUv(uv)) {
        return vec4(0.0);
    }

    return texture2D(
        u_game,
        uv
    );
}


vec4 sampleUi(vec2 uv) {
    if (isOutsideUv(uv)) {
        return vec4(0.0);
    }

    return texture2D(
        u_ui,
        uv
    );
}


vec4 blurGame(vec2 uv) {
    vec2 pixel = 1.0 / u_gameResolution;

    vec4 color = vec4(0.0);

    color += sampleGame(
        uv + pixel * vec2(-1.0, -1.0)
    ) * 0.0625;

    color += sampleGame(
        uv + pixel * vec2(0.0, -1.0)
    ) * 0.1250;

    color += sampleGame(
        uv + pixel * vec2(1.0, -1.0)
    ) * 0.0625;

    color += sampleGame(
        uv + pixel * vec2(-1.0, 0.0)
    ) * 0.1250;

    color += sampleGame(
        uv
    ) * 0.2500;

    color += sampleGame(
        uv + pixel * vec2(1.0, 0.0)
    ) * 0.1250;

    color += sampleGame(
        uv + pixel * vec2(-1.0, 1.0)
    ) * 0.0625;

    color += sampleGame(
        uv + pixel * vec2(0.0, 1.0)
    ) * 0.1250;

    color += sampleGame(
        uv + pixel * vec2(1.0, 1.0)
    ) * 0.0625;

    return color;
}


vec3 processGame(vec2 gameUv) {
    vec4 gameColor = sampleGame(
        gameUv
    );

    gameColor.rgb = applyColorCorrection(
        gameColor.rgb,
        GAME_CONTRAST,
        GAME_SATURATION,
        GAME_BRIGHTNESS
    );

    vec4 blurred = blurGame(
        gameUv
    );

    blurred.rgb = adjustContrast(
        blurred.rgb,
        GAME_BLUR_CONTRAST
    );

    gameColor.rgb = mix(
        gameColor.rgb,
        blurred.rgb,
        GAME_BLUR_MIX
    );

    return gameColor.rgb;
}


vec4 processUi(vec2 uv) {
    vec4 uiColor = sampleUi(
        uv
    );

    if (uiColor.a > 0.0) {
        uiColor.rgb = applyColorCorrection(
            uiColor.rgb,
            UI_CONTRAST,
            UI_SATURATION,
            UI_BRIGHTNESS
        );
    }

    return uiColor;
}


vec3 composeScene(vec2 curvedUv) {
    vec2 screenPixel =
        curvedUv *
        u_resolution;

    vec2 gamePixel =
        screenPixel / u_scale -
        u_offset;

    vec2 gameUv =
        gamePixel /
        u_gameResolution;

    vec3 gameColor = processGame(
        gameUv
    );

    vec4 uiColor = processUi(
        curvedUv
    );

    return mix(
        gameColor,
        uiColor.rgb,
        uiColor.a
    );
}


float getEdgeFactor(vec2 uv) {
    vec2 centered = uv - 0.5;

    centered.x *= (
        u_resolution.x /
        u_resolution.y
    );

    float distanceFromCenter = length(
        centered
    );

    return pow(
        clamp(
            distanceFromCenter * 1.5,
            0.0,
            1.0
        ),
        CHROMATIC_EDGE_POWER
    );
}


vec3 applyChromaticAberration(vec2 curvedUv) {
    vec2 pixel =
        1.0 /
        u_resolution;

    vec2 centered =
        curvedUv -
        0.5;

    float centeredLength = length(
        centered
    );

    vec2 direction = vec2(0.0);

    if (centeredLength > 0.0001) {
        direction =
            centered /
            centeredLength;
    }

    float edgeFactor = getEdgeFactor(
        curvedUv
    );

    vec2 offset =
        direction *
        pixel *
        CHROMATIC_ABERRATION *
        edgeFactor;

    vec3 centerColor = composeScene(
        curvedUv
    );

    vec3 redSample = composeScene(
        curvedUv + offset
    );

    vec3 blueSample = composeScene(
        curvedUv - offset
    );

    return vec3(
        redSample.r,
        centerColor.g,
        blueSample.b
    );
}


float getScanline(vec2 screenPixel) {
    float scanlinePosition = mod(
        floor(screenPixel.y),
        SCANLINE_SIZE
    );

    float scanline = step(
        SCANLINE_SIZE * 0.5,
        scanlinePosition
    );

    return (
        scanline *
        SCANLINE_STRENGTH
    );
}


float getFilmGrain(vec2 screenPixel) {
    vec2 animatedPosition =
        screenPixel +
        vec2(
            u_time * 173.0,
            u_time * 91.0
        );

    float grain = random(
        animatedPosition
    );

    grain =
        grain * 2.0 -
        1.0;

    return (
        grain *
        GRAIN_STRENGTH
    );
}


float getVignette(vec2 uv) {
    vec2 centered =
        uv -
        0.5;

    centered.x *= (
        u_resolution.x /
        u_resolution.y
    );

    float distanceFromCenter = length(
        centered
    );

    return smoothstep(
        VIGNETTE_INNER,
        VIGNETTE_OUTER,
        distanceFromCenter
    );
}


vec3 applyCrtEffects(
    vec3 color,
    vec2 uv,
    vec2 screenPixel
) {
    float scanline = getScanline(
        screenPixel
    );

    color *= (
        1.0 -
        scanline
    );

    float grain = getFilmGrain(
        screenPixel
    );

    color += grain;

    float vignette = getVignette(
        uv
    );

    color *= (
        1.0 -
        vignette *
        VIGNETTE_STRENGTH
    );

    return color;
}


void main() {
    /*
     * Toute la scène, UI comprise, passe par la même
     * déformation CRT.
     */
    vec2 curvedUv = applyCrtCurvature(
        v_uv
    );


    /*
     * Les coins créés par la courbure deviennent noirs.
     */
    if (isOutsideUv(curvedUv)) {
        gl_FragColor = vec4(
            0.0,
            0.0,
            0.0,
            1.0
        );

        return;
    }


    /*
     * RGB split radial.
     *
     * Très faible au centre, plus visible aux bords.
     */
    vec3 finalColor = applyChromaticAberration(
        curvedUv
    );


    /*
     * Les scanlines suivent l'écran physique plutôt que
     * la texture source.
     */
    vec2 screenPixel =
        v_uv *
        u_resolution;


    finalColor = applyCrtEffects(
        finalColor,
        v_uv,
        screenPixel
    );


    finalColor = clamp(
        finalColor,
        0.0,
        1.0
    );


    gl_FragColor = vec4(
        finalColor,
        1.0
    );
}