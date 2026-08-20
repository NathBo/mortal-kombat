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
const float SCANLINE_STRENGTH = 0.025;
const float SCANLINE_SIZE = 3.0;

const float GRAIN_STRENGTH = 0.006;

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
const float PHOSPHOR_THRESHOLD = 0.50;
const float GAME_PHOSPHOR_STRENGTH = 0.06;
const float UI_PHOSPHOR_STRENGTH = 0.015;
const float PHOSPHOR_MAX = 0.50;


/*
 * Fog bas / nappes rampantes.
 */
const float FOG_STRENGTH = 0.1;

uniform vec3 u_fogColor;

const float FOG_HEIGHT = 0.62;
const float FOG_SPEED = 0.05;


/*
 * --------------------------------------------------------------------------
 * Utility
 * --------------------------------------------------------------------------
 */

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


float noise2d(vec2 p) {
    vec2 cell = floor(p);
    vec2 local = fract(p);

    local =
        local *
        local *
        (3.0 - 2.0 * local);

    float a = random(
        cell
    );

    float b = random(
        cell +
        vec2(1.0, 0.0)
    );

    float c = random(
        cell +
        vec2(0.0, 1.0)
    );

    float d = random(
        cell +
        vec2(1.0, 1.0)
    );

    float bottom =
        mix(
            a,
            b,
            local.x
        );

    float top =
        mix(
            c,
            d,
            local.x
        );

    return mix(
        bottom,
        top,
        local.y
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
    float luminance =
        getLuminance(
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


/*
 * --------------------------------------------------------------------------
 * Sampling
 * --------------------------------------------------------------------------
 */

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


/*
 * --------------------------------------------------------------------------
 * Chromatic aberration
 * --------------------------------------------------------------------------
 */

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


vec4 sampleUiChromatic(vec2 uv) {
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


/*
 * --------------------------------------------------------------------------
 * Blur
 * --------------------------------------------------------------------------
 */

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


/*
 * --------------------------------------------------------------------------
 * Phosphor
 * --------------------------------------------------------------------------
 */

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


/*
 * --------------------------------------------------------------------------
 * GAME
 * --------------------------------------------------------------------------
 */

vec3 processGame(
    vec2 gameUv,
    vec2 screenUv
) {
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

    gameColor.rgb =
        mix(
            gameColor.rgb,
            blurred.rgb,
            GAME_BLUR_MIX
        );

    vec3 phosphor =
        extractPhosphor(
            blurred.rgb,
            GAME_PHOSPHOR_STRENGTH
        );

    gameColor.rgb +=
        phosphor;

    return gameColor.rgb;
}


/*
 * --------------------------------------------------------------------------
 * UI
 * --------------------------------------------------------------------------
 */

vec4 processUi(vec2 uv) {
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




/*
 * --------------------------------------------------------------------------
 * Atmospheric fog
 * --------------------------------------------------------------------------
 */

float fogLayer(
    vec2 uv,
    float scale,
    float speed,
    float verticalOffset,
    float seed
) {
    float y = 1.0 - uv.y;

    vec2 fogUv =
        vec2(
            uv.x * scale,
            y * scale * 2.2
        );

    fogUv.x +=
        u_time *
        speed;

    fogUv.y +=
        sin(
            uv.x * 8.0 +
            u_time * speed * 4.0 +
            seed
        ) * 0.12;

    float noiseValue =
        noise2d(
            fogUv +
            vec2(
                seed,
                seed * 0.73
            )
        );

    float wave =
        sin(
            uv.x * 10.0 +
            u_time * speed * 2.0 +
            seed
        ) * 0.025;

    float fogTop =
        FOG_HEIGHT +
        verticalOffset +
        wave +
        (noiseValue - 0.5) * 0.12;

    float heightMask =
        1.0 -
        smoothstep(
            fogTop - 0.10,
            fogTop,
            y
        );

    float groundDensity =
        1.0 -
        smoothstep(
            0.0,
            FOG_HEIGHT + 0.08,
            y
        );

    float density =
        smoothstep(
            0.32,
            0.78,
            noiseValue
        );

    return (
        density *
        heightMask *
        mix(
            0.35,
            1.0,
            groundDensity
        )
    );
}


float getAtmosphericFog(vec2 uv) {
    float y = 1.0 - uv.y;

    float layerA =
        fogLayer(
            uv,
            3.2,
            FOG_SPEED,
            0.00,
            4.3
        );

    float layerB =
        fogLayer(
            uv,
            5.1,
            -FOG_SPEED * 0.55,
            -0.07,
            13.7
        );

    float layerC =
        fogLayer(
            uv,
            2.0,
            FOG_SPEED * 0.28,
            0.04,
            27.1
        );

    float fog =
        layerA * 0.50 +
        layerB * 0.32 +
        layerC * 0.18;

    float globalHeightMask =
        1.0 -
        smoothstep(
            FOG_HEIGHT * 0.70,
            FOG_HEIGHT + 0.18,
            y
        );

    return (
        fog *
        globalHeightMask *
        FOG_STRENGTH
    );
}


vec3 applyAtmosphericFog(
    vec3 color,
    vec2 uv
) {
    float fog =
        getAtmosphericFog(
            uv
        );

    return mix(
        color,
        u_fogColor,
        fog
    );
}


/*
 * --------------------------------------------------------------------------
 * CRT
 * --------------------------------------------------------------------------
 */

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


/*
 * --------------------------------------------------------------------------
 * Main
 * --------------------------------------------------------------------------
 */

 
/*
 * --------------------------------------------------------------------------
 * Composition
 * --------------------------------------------------------------------------
 */

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


    /*
     * GAME.
     */
    vec3 gameColor =
        processGame(
            gameUv,
            uv
        );


    /*
     * Fog uniquement sur le GAME.
     *
     * L'UI n'est pas encore composée à ce stade.
     */
    gameColor =
        applyAtmosphericFog(
            gameColor,
            uv
        );


    /*
     * UI.
     */
    vec4 uiColor =
        processUi(
            uv
        );


    /*
     * L'UI passe au-dessus du GAME + fog.
     */
    return mix(
        gameColor,
        uiColor.rgb,
        uiColor.a
    );
}



void main() {
    /*
     * composeScene() contient maintenant :
     *
     * GAME
     * → fog
     * → UI
     */
    vec3 finalColor =
        composeScene(
            v_uv
        );


    vec2 screenPixel =
        v_uv *
        u_resolution;


    /*
     * CRT commun au GAME et à l'UI.
     */
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