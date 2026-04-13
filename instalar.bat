@echo off
if not exist "%APPDATA%\qz" mkdir "%APPDATA%\qz"
if not exist "%APPDATA%\qz\certs" mkdir "%APPDATA%\qz\certs"

:: ── allowed.dat ──────────────────────────────────────────────────────────────
echo http://localhost:3000> "%APPDATA%\qz\allowed.dat"

:: ── Certificado de confianza ─────────────────────────────────────────────────
(
echo -----BEGIN CERTIFICATE-----
echo MIIDETCCAfmgAwIBAgIUZ3AQoe5ZadfdYO7f0EjIIb4dYsMwDQYJKoZIhvcNAQEL
echo BQAwGDEWMBQGA1UEAwwNQnJ1dGFsQnVyZ2VyczAeFw0yNjA0MTIxNDU3NDBaFw0z
echo NjA0MDkxNDU3NDBaMBgxFjAUBgNVBAMMDUJydXRhbEJ1cmdlcnMwggEiMA0GCSqG
echo SIb3DQEBAQUAA4IBDwAwggEKAoIBAQDmwqoyb/Q9phj/TjSwtEl7ckCw3u2Yy+N0
echo irT2sa0IwG+RzY5N8yTaMzxILIoyG5KJU0tKwG6rFIJzLu8WiJmoBnyWv0cQi2wv
echo 26cETCzOPAMuRPv+4RwyLtxTZ8aanXv+wRnQOiB4FkkwkSOtNBHIeRQ9gb7LWtSE
echo Izi9VJe1vLxVSl6Cleu+ykulRUDFYs7hsqthMXCG3q9DGxiCzCASZBv/INwuP1qr
echo PABTOz7qGfsBKhKnWePutPDL1YUQsy0aIrZx5LgwUxvmYxFm/8tUE5alISFIVIAE
echo WsDYfzZJSKE9Q+7Jdb3wVy0LNZ53uNDpCBpLH7PUG2/P+/4XN2P5AgMBAAGjUzBR
echo MB0GA1UdDgQWBBQEGmUyUcFA9ANWBmZ9krYthKGyiTAfBgNVHSMEGDAWgBQEGmUy
echo UcFA9ANWBmZ9krYthKGyiTAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUA
echo A4IBAQAtvRIqKA440e/MeI4JP9sNIv5HgW1WH73Y5jA7+m7d/pHoD+jUQeUghgjd
echo 9EQQI/c7YaY4O01KZuIL4yvJpbQqQf7Ik7O/AGf1cqdt6PrW5rYiTVGNdkbyVQCS
echo 4XOS/s7AD11xIHhxk5zVMVb++ckmXYuf8Zl1IAQWtgytdMNGUGLpsEaJZK/yBT0M
echo apAPQhuIpKUn72bo8vAwUjj8eh+C89DDlK9DanJcGN5yV1uUD7AIa+iAWbCIzhoo
echo Hv3x+KSp3AeNeP730zAQgrTN7uxR1ywn9F+C+uSSHLRV0TqrWrCqOeCaxbchxZU1
echo P4gVGIm8cCV7ymS1GgofhvMTUSmF
echo -----END CERTIFICATE-----
) > "%APPDATA%\qz\certs\brutalburgers.crt"

echo.
echo ✓ allowed.dat creado en %APPDATA%\qz\
echo ✓ Certificado copiado en %APPDATA%\qz\certs\
echo.
echo Reinicia QZ Tray si estaba abierto.
echo La primera vez que llegue un pedido sal una ventana -- marca "Remember" y pulsa "Allow".
echo Despues ya no volvera a preguntar nunca mas.
echo.
pause
