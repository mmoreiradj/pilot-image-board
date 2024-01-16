resource "helm_release" "postgresql" {
  name       = "postgresql"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "postgresql"
  version    = "13.2.27"
  namespace  = var.namespace

  set {
    name  = "primary.persistence.size"
    value = "3Gi"
  }

  set_sensitive {
    name  = "auth.postgresPassword"
    value = random_password.postgresql-postgres-password.result
  }
}

resource "kubernetes_manifest" "application_argo_cd_pilot_image_board_back" {
  manifest = {
    "apiVersion" = "argoproj.io/v1alpha1"
    "kind"       = "Application"
    "metadata" = {
      "labels" = {
        "name" = "${var.namespace}-back"
      }
      "name"      = "${var.namespace}-back"
      "namespace" = "argo-cd"
    }
    "spec" = {
      "destination" = {
        "namespace" = var.namespace
        "server"    = "https://kubernetes.default.svc"
      }

      "project"              = "default"
      "revisionHistoryLimit" = 3
      "source" = {
        "helm" = {
          "valuesObject" = {
            "image" = {
              "tag" = var.image_tags
            }
            "migration" = {
              "image" = {
                "tag" = var.image_tags
              }
            }
            "frontend" = {
              "host" = "https://${var.front_host}"
            }
            "ingress" = {
              "annotations" = {
                "traefik.ingress.kubernetes.io/redirect-entry-point" = "https"
                "traefik.ingress.kubernetes.io/redirect-permanent"   = "true"
              }
              "className" = "traefik"
              "enabled"   = true
              "hosts" = [
                {
                  "host" = var.back_host
                  "paths" = [
                    {
                      "path"     = "/"
                      "pathType" = "Prefix"
                    },
                  ]
                },
              ]
            }
            "jwt" = {
              "secretName" = kubernetes_secret.jwt.metadata[0].name
            }
            "postgresql" = {
              "secretName" = "postgresql"
            }
            "s3" = {
              "bucketName" = "pilot-image-board"
              "host"       = "https://s3.do.moreiradj.net"
              "secretName" = kubernetes_secret.minio.metadata[0].name
            }
          }
        }
        "path"           = ".infra/charts/back"
        "repoURL"        = "https://github.com/mmoreiradj/pilot-image-board.git"
        "targetRevision" = var.charts_target_revision
      }
      "syncPolicy" = {
        "automated" = {
          "allowEmpty" = true
          "prune"      = true
          "selfHeal"   = true
        }
        "retry" = {
          "backoff" = {
            "duration"    = "5s"
            "factor"      = 2
            "maxDuration" = "3m"
          }
          "limit" = 5
        }
        "syncOptions" = [
          "Validate=false",
          "CreateNamespace=false",
          "PrunePropagationPolicy=foreground",
          "PruneLast=true",
          "RespectIgnoreDifferences=true",
        ]
      }
    }
  }
}

resource "kubernetes_manifest" "application_argo_cd_pilot_image_board_front" {
  manifest = {
    "apiVersion" = "argoproj.io/v1alpha1"
    "kind"       = "Application"
    "metadata" = {
      "labels" = {
        "name" = "${var.namespace}-front"
      }
      "name"      = "${var.namespace}-front"
      "namespace" = "argo-cd"
    }
    "spec" = {
      "destination" = {
        "namespace" = var.namespace
        "server"    = "https://kubernetes.default.svc"
      }
      "project"              = "default"
      "revisionHistoryLimit" = 3
      "source" = {
        "helm" = {
          "valuesObject" = {
            "image" = {
              "tag" = var.image_tags
            }
            "ingress" = {
              "annotations" = {
                "traefik.ingress.kubernetes.io/redirect-entry-point" = "https"
                "traefik.ingress.kubernetes.io/redirect-permanent"   = "true"
              }
              "className" = "traefik"
              "enabled"   = true
              "hosts" = [
                {
                  "host" = var.front_host
                  "paths" = [
                    {
                      "path"     = "/"
                      "pathType" = "Prefix"
                    },
                  ]
                },
              ]
            }
          }
        }
        "path"           = ".infra/charts/front"
        "repoURL"        = "https://github.com/mmoreiradj/pilot-image-board.git"
        "targetRevision" = var.charts_target_revision
      }
      "syncPolicy" = {
        "automated" = {
          "allowEmpty" = true
          "prune"      = true
          "selfHeal"   = true
        }
        "retry" = {
          "backoff" = {
            "duration"    = "5s"
            "factor"      = 2
            "maxDuration" = "3m"
          }
          "limit" = 5
        }
        "syncOptions" = [
          "Validate=false",
          "CreateNamespace=false",
          "PrunePropagationPolicy=foreground",
          "PruneLast=true",
          "RespectIgnoreDifferences=true",
        ]
      }
    }
  }
}
