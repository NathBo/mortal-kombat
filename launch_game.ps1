# launch_game.ps1

$ErrorActionPreference = "Stop"

$Root = [System.IO.Path]::GetFullPath(
    (Split-Path -Parent $MyInvocation.MyCommand.Path)
)

$Port = 8000
$Url = "http://localhost:$Port/"


$MimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".htm"   = "text/html; charset=utf-8"
    ".js"    = "text/javascript; charset=utf-8"
    ".mjs"   = "text/javascript; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".json"  = "application/json; charset=utf-8"

    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".webp"  = "image/webp"
    ".svg"   = "image/svg+xml"
    ".ico"   = "image/x-icon"
    ".bmp"   = "image/bmp"

    ".wav"   = "audio/wav"
    ".mp3"   = "audio/mpeg"
    ".ogg"   = "audio/ogg"
    ".m4a"   = "audio/mp4"
    ".flac"  = "audio/flac"

    ".mp4"   = "video/mp4"
    ".webm"  = "video/webm"

    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
    ".otf"   = "font/otf"

    ".wasm"  = "application/wasm"
    ".xml"   = "application/xml"
    ".txt"   = "text/plain; charset=utf-8"
    ".map"   = "application/json; charset=utf-8"
}


function Test-PortAvailable {
    param(
        [Parameter(Mandatory = $true)]
        [int]$Port
    )

    $TcpListener = $null

    try {
        $TcpListener = [System.Net.Sockets.TcpListener]::new(
            [System.Net.IPAddress]::Loopback,
            $Port
        )

        $TcpListener.Start()

        return $true
    }
    catch {
        return $false
    }
    finally {
        if ($null -ne $TcpListener) {
            try {
                $TcpListener.Stop()
            }
            catch {
            }
        }
    }
}


function Get-MimeType {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    $Extension = [System.IO.Path]::GetExtension(
        $Path
    ).ToLowerInvariant()

    if ($MimeTypes.ContainsKey($Extension)) {
        return $MimeTypes[$Extension]
    }

    return "application/octet-stream"
}


function Test-IsExpectedDisconnect {
    param(
        [Parameter(Mandatory = $true)]
        [System.Exception]$Exception
    )

    if (
        $Exception -is [System.IO.IOException] -or
        $Exception -is [System.Net.HttpListenerException] -or
        $Exception -is [System.Net.Sockets.SocketException]
    ) {
        return $true
    }

    if ($null -ne $Exception.InnerException) {
        return Test-IsExpectedDisconnect `
            -Exception $Exception.InnerException
    }

    return $false
}


function Close-ResponseSafely {
    param(
        [Parameter(Mandatory = $true)]
        [System.Net.HttpListenerResponse]$Response
    )

    try {
        $Response.OutputStream.Close()
    }
    catch {
    }

    try {
        $Response.Close()
    }
    catch {
    }
}


function Send-Response {
    param(
        [Parameter(Mandatory = $true)]
        [System.Net.HttpListenerContext]$Context,

        [Parameter(Mandatory = $true)]
        [int]$StatusCode,

        [Parameter(Mandatory = $true)]
        [byte[]]$Content,

        [string]$ContentType = "application/octet-stream",

        [bool]$SendBody = $true
    )

    $Response = $Context.Response

    try {
        $Response.StatusCode = $StatusCode
        $Response.ContentType = $ContentType
        $Response.ContentLength64 = $Content.LongLength

        $Response.Headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
        $Response.Headers["Pragma"] = "no-cache"
        $Response.Headers["Expires"] = "0"

        if ($SendBody -and $Content.Length -gt 0) {
            $Response.OutputStream.Write(
                $Content,
                0,
                $Content.Length
            )
        }
    }
    catch {
        if (-not (Test-IsExpectedDisconnect -Exception $_.Exception)) {
            throw
        }
    }
    finally {
        Close-ResponseSafely -Response $Response
    }
}


function Send-TextResponse {
    param(
        [Parameter(Mandatory = $true)]
        [System.Net.HttpListenerContext]$Context,

        [Parameter(Mandatory = $true)]
        [int]$StatusCode,

        [Parameter(Mandatory = $true)]
        [string]$Text,

        [bool]$SendBody = $true
    )

    $Content = [System.Text.Encoding]::UTF8.GetBytes($Text)

    Send-Response `
        -Context $Context `
        -StatusCode $StatusCode `
        -Content $Content `
        -ContentType "text/plain; charset=utf-8" `
        -SendBody $SendBody
}


function Get-SafeFilePath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$RootDirectory,

        [Parameter(Mandatory = $true)]
        [string]$RequestPath
    )

    try {
        $DecodedPath = [System.Uri]::UnescapeDataString(
            $RequestPath
        )
    }
    catch {
        return $null
    }

    $DecodedPath = $DecodedPath.Replace(
        "/",
        [System.IO.Path]::DirectorySeparatorChar
    )

    $DecodedPath = $DecodedPath.TrimStart(
        [System.IO.Path]::DirectorySeparatorChar
    )

    if ([string]::IsNullOrWhiteSpace($DecodedPath)) {
        $DecodedPath = "index.html"
    }

    try {
        $CandidatePath = [System.IO.Path]::GetFullPath(
            [System.IO.Path]::Combine(
                $RootDirectory,
                $DecodedPath
            )
        )
    }
    catch {
        return $null
    }

    $RootPrefix = $RootDirectory

    if (-not $RootPrefix.EndsWith(
        [System.IO.Path]::DirectorySeparatorChar
    )) {
        $RootPrefix += [System.IO.Path]::DirectorySeparatorChar
    }

    $IsRoot = $CandidatePath.Equals(
        $RootDirectory,
        [System.StringComparison]::OrdinalIgnoreCase
    )

    $IsInsideRoot = $CandidatePath.StartsWith(
        $RootPrefix,
        [System.StringComparison]::OrdinalIgnoreCase
    )

    if (-not $IsRoot -and -not $IsInsideRoot) {
        return $null
    }

    if ([System.IO.Directory]::Exists($CandidatePath)) {
        $CandidatePath = Join-Path `
            $CandidatePath `
            "index.html"
    }

    return $CandidatePath
}


function Handle-Request {
    param(
        [Parameter(Mandatory = $true)]
        [System.Net.HttpListenerContext]$Context
    )

    $Request = $Context.Request
    $SendBody = $Request.HttpMethod -ne "HEAD"

    try {
        if (
            $Request.HttpMethod -ne "GET" -and
            $Request.HttpMethod -ne "HEAD"
        ) {
            Send-TextResponse `
                -Context $Context `
                -StatusCode 405 `
                -Text "405 - Method Not Allowed" `
                -SendBody $SendBody

            return
        }

        $FilePath = Get-SafeFilePath `
            -RootDirectory $Root `
            -RequestPath $Request.Url.AbsolutePath

        if ($null -eq $FilePath) {
            Send-TextResponse `
                -Context $Context `
                -StatusCode 403 `
                -Text "403 - Forbidden" `
                -SendBody $SendBody

            return
        }

        if (-not [System.IO.File]::Exists($FilePath)) {
            Send-TextResponse `
                -Context $Context `
                -StatusCode 404 `
                -Text "404 - File Not Found" `
                -SendBody $SendBody

            return
        }

        $Content = [System.IO.File]::ReadAllBytes(
            $FilePath
        )

        $MimeType = Get-MimeType `
            -Path $FilePath

        Send-Response `
            -Context $Context `
            -StatusCode 200 `
            -Content $Content `
            -ContentType $MimeType `
            -SendBody $SendBody
    }
    catch {
        if (Test-IsExpectedDisconnect -Exception $_.Exception) {
            return
        }

        Write-Host `
            "Erreur serveur : $($_.Exception.Message)" `
            -ForegroundColor Red

        try {
            Send-TextResponse `
                -Context $Context `
                -StatusCode 500 `
                -Text "500 - Internal Server Error" `
                -SendBody $SendBody
        }
        catch {
        }
    }
}


function Start-GameBrowser {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Url
    )

    try {
        Start-Process $Url
    }
    catch {
        Write-Host ""
        Write-Host `
            "Unable to open Browser automatically" `
            -ForegroundColor Yellow

        Write-Host "Ouvre manuellement : $Url"
    }
}


if (-not (Test-PortAvailable -Port $Port)) {
    Clear-Host

    Write-Host "========================================" -ForegroundColor Red
    Write-Host "       Unable to Launch Game" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""

    Write-Host `
        "Prt $Port is already in used." `
        -ForegroundColor Yellow

    Write-Host ""
    Write-Host `
        "This game only uses http://localhost:$Port in order to keep save date consistent." `
        -ForegroundColor White

    Write-Host ""
    Write-Host `
        "Close the app using this port then close the game" `
        -ForegroundColor White

    Write-Host ""
    Read-Host "Push Enter to Close"

    exit 1
}


$Listener = [System.Net.HttpListener]::new()
$Listener.Prefixes.Add($Url)


try {
    $Listener.Start()

    Clear-Host

    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "          GAME SERVER RUNNING" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""

    Write-Host "Folder : $Root"
    Write-Host "Adress : $Url"

    Write-Host ""
    Write-Host `
        "Port $Port stays fixed to keep save data." `
        -ForegroundColor DarkGray

    Write-Host ""
    Write-Host `
        "Close this window to close the server." `
        -ForegroundColor DarkGray

    Write-Host ""

    Start-GameBrowser -Url $Url

    while ($Listener.IsListening) {
        try {
            $Context = $Listener.GetContext()

            Handle-Request -Context $Context
        }
        catch {
            if (-not $Listener.IsListening) {
                break
            }

            if (Test-IsExpectedDisconnect -Exception $_.Exception) {
                continue
            }

            Write-Host `
                "Erreur listener : $($_.Exception.Message)" `
                -ForegroundColor Red
        }
    }
}
finally {
    if ($null -ne $Listener) {
        try {
            if ($Listener.IsListening) {
                $Listener.Stop()
            }
        }
        catch {
        }

        try {
            $Listener.Close()
        }
        catch {
        }
    }
}