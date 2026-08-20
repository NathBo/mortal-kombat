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
 * Réglages GAME.
 */
const float GAME_CONTRAST = 1.10;
const float GAME_SATURATION = 1.20;
const float GAME_BRIGHTNESS = 0.92;


/*
 * Réglages UI.
 *
 * Tu peux les modifier indépendamment du jeu.
 */
const float UI_CONTRAST = 1.05;
const float UI_SATURATION = 1.05;
const float UI_BRIGHTNESS = 1.00;


/*
 * Réglages CRT communs à GAME + UI.
 */
const float SCANLINE_STRENGTH = 0.05;
const float SCANLINE_SIZE = 4.0;

const float GRAIN_STRENGTH = 0.015;

const float VIGNETTE_STRENGTH = 0.32;
const float VIGNETTE_INNER = 0.25;
const float VIGNETTE_OUTER = 0.78;


/*
 * Réglages du glow/blur du jeu.
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


vec4 sampleGame(vec2 uv) {
    if (
        uv.x < 0.0 ||
        uv.x > 1.0 ||
        uv.y < 0.0 ||
        uv.y > 1.0
    ) {
        return vec4(0.0);
    }

    return texture2D(
        u_game,
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


    /*
     * Léger glow/blur uniquement sur le jeu.
     */
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
    vec4 uiColor = texture2D(
        u_ui,
        uv
    );

    /*
     * On évite de modifier inutilement les pixels
     * complètement transparents de l'UI.
     */
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


float getScanline(vec2 screenPixel) {
    float scanlinePosition = mod(
        floor(screenPixel.y),
        SCANLINE_SIZE
    );

    float scanline = step(
        SCANLINE_SIZE * 0.5,
        scanlinePosition
    );

    return scanline * SCANLINE_STRENGTH;
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

    grain = grain * 2.0 - 1.0;

    return grain * GRAIN_STRENGTH;
}


float getVignette(vec2 uv) {
    vec2 centered = uv - 0.5;

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
    /*
     * Scanlines.
     */
    float scanline = getScanline(
        screenPixel
    );

    color *= 1.0 - scanline;


    /*
     * Grain.
     */
    float grain = getFilmGrain(
        screenPixel
    );

    color += grain;


    /*
     * Vignette.
     */
    float vignette = getVignette(
        uv
    );

    color *= (
        1.0 -
        vignette * VIGNETTE_STRENGTH
    );


    return color;
}


void main() {
    vec2 screenPixel =
        v_uv *
        u_resolution;


    /*
     * Transformation appliquée uniquement au canvas du jeu.
     *
     * Équivalent approximatif à :
     *
     * screenCtx.scale(1.2, 1.2);
     * screenCtx.drawImage(canvas, decx, decy, w, h);
     */
    vec2 gamePixel =
        screenPixel / u_scale -
        u_offset;

    vec2 gameUv =
        gamePixel /
        u_gameResolution;


    /*
     * GAME :
     *
     * contraste / saturation / brightness
     * +
     * blur/glow.
     */
    vec3 gameColor = processGame(
        gameUv
    );


    /*
     * UI :
     *
     * contraste / saturation / brightness
     * indépendants du jeu.
     *
     * L'UI n'utilise pas le scale/offset du jeu.
     */
    vec4 uiColor = processUi(
        v_uv
    );


    /*
     * Composition GAME + UI.
     */
    vec3 finalColor = mix(
        gameColor,
        uiColor.rgb,
        uiColor.a
    );


    /*
     * CRT appliqué APRÈS composition.
     *
     * Donc GAME et UI subissent les mêmes :
     *
     * - scanlines
     * - grain
     * - vignette
     */
    finalColor = applyCrtEffects(
        finalColor,
        v_uv,
        screenPixel
    );


    /*
     * Évite les valeurs hors plage après les différents effets.
     */
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