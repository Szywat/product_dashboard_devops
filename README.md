## Rozwiązanie zadania 1

Polecenia `docker buildx` użyte do zbudowania i opublikowania obrazów wieloplaformowych:

```bash
docker buildx build --platform linux/amd64,linux/arm64 --tag szywat/product-backend:v3 --push ./backend/

docker buildx build --platform linux/amd64,linux/arm64 --tag szywat/product-frontend:v3 --push ./frontend/

docker pull szywat/product-backend:v3

docker pull szywat/product-frontend:v3
```

Wyniki poleceń `docker buildx imagetools inspect`:

```bash
$ docker buildx imagetools inspect szywat/product-backend:v3

Name:      docker.io/szywat/product-backend:v3
MediaType: application/vnd.oci.image.index.v1+json
Digest:    sha256:9f567ea28aad98d05451532ae9cfbe5111120c1e30e14b0a81c77e0979cc69c9

Manifests:
  Name:        docker.io/szywat/product-backend:v3@sha256:3ce2a3def05bb0cd6d2dec7598c095f3d823bb4ec4dea224e24574bac44457ef
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    linux/amd64

  Name:        docker.io/szywat/product-backend:v3@sha256:087a6bb7ba9827e30653775c2aeec349e5ca2ae20ffebb029ee55223ee40250d
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    linux/arm64

  Name:        docker.io/szywat/product-backend:v3@sha256:f04e304d2d567cb2d1dbb14441a845dd7b788f6f226d70c8efd5b9a5ce31ced6
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    unknown/unknown
  Annotations:
    vnd.docker.reference.digest: sha256:3ce2a3def05bb0cd6d2dec7598c095f3d823bb4ec4dea224e24574bac44457ef
    vnd.docker.reference.type:   attestation-manifest

  Name:        docker.io/szywat/product-backend:v3@sha256:dd3c837424d7a7a4bcb747511aa28a71de65a48e3f907689dcec4e28ce1d51ea
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    unknown/unknown
  Annotations:
    vnd.docker.reference.digest: sha256:087a6bb7ba9827e30653775c2aeec349e5ca2ae20ffebb029ee55223ee40250d
    vnd.docker.reference.type:   attestation-manifest
```

```bash
$ docker buildx imagetools inspect szywat/product-frontend:v3

Name:      docker.io/szywat/product-frontend:v3
MediaType: application/vnd.oci.image.index.v1+json
Digest:    sha256:a745dbfb3a99dfcfbaf675d8168456f00046245e94f2752e69bdabdc19e78813

Manifests:
  Name:        docker.io/szywat/product-frontend:v3@sha256:7cff5d440b902fd2240ef9ffa69f35c3407a9e65efa4140a93ca676e8efd4cb2
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    linux/amd64

  Name:        docker.io/szywat/product-frontend:v3@sha256:fcb2b0e32e020d873fc80555ecf381a6ad1acf34e64b574b4e79bb7c8c9d4faa
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    linux/arm64

  Name:        docker.io/szywat/product-frontend:v3@sha256:a005e1f0ac7f9f45979855aad91f881964ac4f101bf1cc0558e6b88dd95e3ef2
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    unknown/unknown
  Annotations:
    vnd.docker.reference.digest: sha256:7cff5d440b902fd2240ef9ffa69f35c3407a9e65efa4140a93ca676e8efd4cb2
    vnd.docker.reference.type:   attestation-manifest

  Name:        docker.io/szywat/product-frontend:v3@sha256:c0dbce8f07e53eec17d5904317c9376ebbc2b1cd8a7347a663fe91e014d9c6a7
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    unknown/unknown
  Annotations:
    vnd.docker.reference.digest: sha256:fcb2b0e32e020d873fc80555ecf381a6ad1acf34e64b574b4e79bb7c8c9d4faa
    vnd.docker.reference.type:   attestation-manifest
```
