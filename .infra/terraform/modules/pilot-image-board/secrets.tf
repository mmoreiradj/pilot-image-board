resource "random_password" "jwt-access-key" {
  length  = 32
  special = true
}

resource "random_password" "jwt-secret-key" {
  length  = 32
  special = true
}

resource "kubernetes_secret" "jwt" {
  metadata {
    name      = "jwt"
    namespace = var.namespace
  }

  data = {
    "access"  = random_password.jwt-access-key.result
    "refresh" = random_password.jwt-secret-key.result
  }
}

data "vault_generic_secret" "minio" {
  path = "kvv2/minio"
}

resource "kubernetes_secret" "minio" {
  metadata {
    name      = "minio"
    namespace = var.namespace
  }

  data = {
    "minio-access-key" = data.vault_generic_secret.minio.data["minio-access-key"]
    "minio-secret-key" = data.vault_generic_secret.minio.data["minio-secret-key"]
  }
}

resource "random_password" "postgresql-postgres-password" {
  length  = 16
  special = false
}
