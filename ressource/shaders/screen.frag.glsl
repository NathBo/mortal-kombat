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
 * GAME color grading.
 */
const float GAME_CONTRAST = 1.10;
const float GAME_SATURATION = 1.15;
const float GAME_BRIGHTNESS = 0.92;


/*
 * UI color grading.
 */
const float UI_CONTRAST = 1.05;
const float UI_SATURATION = 1.0;
const float UI_BRIGHTNESS = 0.98;


/*
 * CRT.
 */
const float SCANLINE_STRENGTH = 0.05;
const float SCANLINE_SIZE = 3.0;

const float GRAIN_STRENGTH = 0.01;

const float VIGNETTE_STRENGTH = 0.12;
const float VIGNETTE_INNER = 0.25;
const float VIGNETTE_OUTER = 0.78;


/*
 * Aberration chromatique.
 */
const float CHROMATIC_ABERRATION = 0.20;
const float CHROMATIC_EDGE_POWER = 1.60;


/*
 * Blur GAME.
 */
const float GAME_BLUR_MIX = 0.025;
const float GAME_BLUR_CONTRAST = 1.30;


/*
 * Phosphore / bloom.
 */
const float PHOSPHOR_THRESHOLD = 0.4;
const float GAME_PHOSPHOR_STRENGTH = 0.1;
const float UI_PHOSPHOR_STRENGTH = 0.015;
const float PHOSPHOR_MAX = 0.20;


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


float getLuminance(vec3 color) {
    return dot(
        color,
        vec3(
            0.2126,
            0.7152,
            0.0722
        )
    );
}


vec3 adjustContrast(
    vec3 color,
    float contrast
) {
    return (
        color - 0.5
    ) * contrast + 0.5;
}


vec3 adjustSaturation(
    vec3 color,
    float saturation
) {
    float luminance = getLuminance(
        color
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


float getEdgeFactor(vec2 screenUv) {
    vec2 centered =
        screenUv -
        0.5;

    centered.x *= (
        u_resolution.x /
        u_resolution.y
    );

    float distanceFromCenter =
        length(
            centered
        );

    return pow(
        clamp(
            distanceFromCenter *
            1.5,
            0.0,
            1.0
        ),
        CHROMATIC_EDGE_POWER
    );
}


vec2 getChromaticDirection(vec2 screenUv) {
    vec2 centered =
        screenUv -
        0.5;

    float centeredLength =
        length(
            centered
        );

    if (centeredLength <= 0.0001) {
        return vec2(0.0);
    }

    return (
        centered /
        centeredLength
    );
}


vec2 getScreenChromaticOffset(vec2 screenUv) {
    vec2 direction =
        getChromaticDirection(
            screenUv
        );

    float edgeFactor =
        getEdgeFactor(
            screenUv
        );

    vec2 screenPixelSize =
        1.0 /
        u_resolution;

    return (
        direction *
        screenPixelSize *
        CHROMATIC_ABERRATION *
        edgeFactor
    );
}


vec2 screenOffsetToGameOffset(
    vec2 screenUvOffset
) {
    vec2 screenPixelOffset =
        screenUvOffset *
        u_resolution;

    vec2 gamePixelOffset =
        screenPixelOffset /
        u_scale;

    return (
        gamePixelOffset /
        u_gameResolution
    );
}


vec4 sampleGameChromatic(
    vec2 gameUv,
    vec2 screenUv
) {
    vec2 screenOffset =
        getScreenChromaticOffset(
            screenUv
        );

    vec2 gameOffset =
        screenOffsetToGameOffset(
            screenOffset
        );

    vec4 centerSample =
        sampleGame(
            gameUv
        );

    vec4 redSample =
        sampleGame(
            gameUv +
            gameOffset
        );

    vec4 blueSample =
        sampleGame(
            gameUv -
            gameOffset
        );

    return vec4(
        redSample.r,
        centerSample.g,
        blueSample.b,
        centerSample.a
    );
}


vec4 sampleUiChromatic(
    vec2 uv
) {
    vec2 offset =
        getScreenChromaticOffset(
            uv
        );

    vec4 centerSample =
        sampleUi(
            uv
        );

    vec4 redSample =
        sampleUi(
            uv +
            offset
        );

    vec4 blueSample =
        sampleUi(
            uv -
            offset
        );

    return vec4(
        redSample.r,
        centerSample.g,
        blueSample.b,
        centerSample.a
    );
}


vec4 blurGame(vec2 uv) {
    vec2 pixel =
        1.0 /
        u_gameResolution;

    vec4 color =
        vec4(0.0);

    color += sampleGame(
        uv +
        pixel * vec2(-1.0, -1.0)
    ) * 0.0625;

    color += sampleGame(
        uv +
        pixel * vec2(0.0, -1.0)
    ) * 0.1250;

    color += sampleGame(
        uv +
        pixel * vec2(1.0, -1.0)
    ) * 0.0625;


    color += sampleGame(
        uv +
        pixel * vec2(-1.0, 0.0)
    ) * 0.1250;

    color += sampleGame(
        uv
    ) * 0.2500;

    color += sampleGame(
        uv +
        pixel * vec2(1.0, 0.0)
    ) * 0.1250;


    color += sampleGame(
        uv +
        pixel * vec2(-1.0, 1.0)
    ) * 0.0625;

    color += sampleGame(
        uv +
        pixel * vec2(0.0, 1.0)
    ) * 0.1250;

    color += sampleGame(
        uv +
        pixel * vec2(1.0, 1.0)
    ) * 0.0625;

    return color;
}


vec3 extractPhosphor(
    vec3 color,
    float strength
) {
    float luminance =
        getLuminance(
            color
        );

    float highlight =
        smoothstep(
            PHOSPHOR_THRESHOLD,
            1.0,
            luminance
        );

    vec3 phosphor =
        color *
        highlight *
        strength;

    return min(
        phosphor,
        vec3(PHOSPHOR_MAX)
    );
}


vec3 processGame(
    vec2 gameUv,
    vec2 screenUv
) {
    /*
     * L'aberration est faite ici directement sur u_game.
     *
     * 3 samples au lieu de recalculer toute la scène
     * trois fois.
     */
    vec4 gameColor =
        sampleGameChromatic(
            gameUv,
            screenUv
        );

    gameColor.rgb =
        applyColorCorrection(
            gameColor.rgb,
            GAME_CONTRAST,
            GAME_SATURATION,
            GAME_BRIGHTNESS
        );


    /*
     * Le blur n'est calculé qu'une seule fois.
     */
    vec4 blurred =
        blurGame(
            gameUv
        );

    blurred.rgb =
        applyColorCorrection(
            blurred.rgb,
            GAME_BLUR_CONTRAST,
            GAME_SATURATION,
            GAME_BRIGHTNESS
        );


    /*
     * Léger adoucissement.
     */
    gameColor.rgb =
        mix(
            gameColor.rgb,
            blurred.rgb,
            GAME_BLUR_MIX
        );


    /*
     * Phosphore utilisant le blur existant.
     */
    vec3 phosphor =
        extractPhosphor(
            blurred.rgb,
            GAME_PHOSPHOR_STRENGTH
        );

    gameColor.rgb +=
        phosphor;

    return gameColor.rgb;
}


vec4 processUi(vec2 uv) {
    /*
     * 3 samples seulement pour l'aberration UI.
     */
    vec4 uiColor =
        sampleUiChromatic(
            uv
        );

    if (uiColor.a <= 0.0) {
        return uiColor;
    }

    uiColor.rgb =
        applyColorCorrection(
            uiColor.rgb,
            UI_CONTRAST,
            UI_SATURATION,
            UI_BRIGHTNESS
        );

    uiColor.rgb +=
        extractPhosphor(
            uiColor.rgb,
            UI_PHOSPHOR_STRENGTH
        );

    return uiColor;
}


vec3 composeScene(vec2 uv) {
    vec2 screenPixel =
        uv *
        u_resolution;

    vec2 gamePixel =
        screenPixel /
        u_scale -
        u_offset;

    vec2 gameUv =
        gamePixel /
        u_gameResolution;

    vec3 gameColor =
        processGame(
            gameUv,
            uv
        );

    vec4 uiColor =
        processUi(
            uv
        );

    return mix(
        gameColor,
        uiColor.rgb,
        uiColor.a
    );
}


float getScanline(
    vec2 screenPixel
) {
    float phase =
        screenPixel.y *
        3.14159265 *
        2.0 /
        SCANLINE_SIZE;

    float wave =
        sin(
            phase
        ) *
        0.5 +
        0.5;

    return (
        wave *
        SCANLINE_STRENGTH
    );
}


float getFilmGrain(
    vec2 screenPixel
) {
    vec2 animatedPosition =
        screenPixel +
        vec2(
            u_time * 173.0,
            u_time * 91.0
        );

    float grain =
        random(
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

    float distanceFromCenter =
        length(
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
    float scanline =
        getScanline(
            screenPixel
        );

    color *= (
        1.0 -
        scanline
    );


    float grain =
        getFilmGrain(
            screenPixel
        );

    color += grain;


    float vignette =
        getVignette(
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
     * La scène entière n'est composée qu'une seule fois.
     */
    vec3 finalColor =
        composeScene(
            v_uv
        );

    vec2 screenPixel =
        v_uv *
        u_resolution;

    finalColor =
        applyCrtEffects(
            finalColor,
            v_uv,
            screenPixel
        );

    finalColor =
        clamp(
            finalColor,
            0.0,
            1.0
        );

    gl_FragColor =
        vec4(
            finalColor,
            1.0
        );
}