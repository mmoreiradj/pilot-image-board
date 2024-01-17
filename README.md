# Ephemeral Environments

This repository contains a demo for ephemeral environments.

Ephemeral environments are environments that are created on demand and destroyed when no longer needed. They are typically used for testing and development purposes. They accelerate the development process by providing a fast feedback loop. They also reduce the cost of devlopment environments by only running when needed.

## Demo

This demo uses:

- [Terraform](https://www.terraform.io/) to provision the infrastructure on a Kubernetes cluster
- [Helm](https://helm.sh/) charts to deploy the application
- [ArgoCD](https://argoproj.github.io/cd/) to update the application when the code changes
- [GitHub Actions](https://docs.github.com/actions) to orchestrate the workflow

It also integrates with:

- [GitHub Container Registry](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry) to store the Docker images
- [Github Secrets](https://docs.github.com/actions/security-guides/using-secrets-in-github-actions) to store the secrets
- [SonarQube](https://www.sonarqube.org/) to analyze the code quality
- [EsLint](https://eslint.org/) to lint the code
- [Prettier](https://prettier.io/) to check the format of the code

### Workflow

[You can see an example of the workflow here](https://github.com/mmoreiradj/pilot-image-board/actions/runs/7548649007) and a demo of the ephemeral environment [here](https://github.com/mmoreiradj/pilot-image-board/pull/8).

The workflow is triggered when a pull request is opened. It runs the following steps:

- Check the format of the code
- Lint the code
- Check if it builds
- Send the code to SonarQube for analysis

Then it runs concurrently:

- A deployment of the application with terraform
  - It creates a namespace
  - A PostgreSQL database
  - Creates the backend and frontend deployments
- A build of the images

Theses two run concurrently because they can both take a long time to run. Even though the build is needed for the deployment, it is not a blocker. Kubernetes will keep trying to pull the image until it is available.

When the build is done, it pushes the images to the GitHub Container Registry.

Finally, it sends a message to the pull request with the URL of the ephemeral environment.

Finally, when the pull request is closed, it destroys the ephemeral environment.

### Stuff to consider

- The workflow does not run the terraform files from the main branch, but from the pull request branch. This means that if your repository is not private and you don't configure who can run the workflow, anyone can run the workflow and create an ephemeral environment. This can be a security issue.
- You need to use concurrency groups to run the deployment and the build concurrently. Terraform does not support concurrency natively. If you don't use concurrency groups, you might run into conflicts and race conditions.

## The actual application

Note: The application is not the focus of this demo. It is only used to demonstrate the ephemeral environments. As it is an old application I made to learn React and NestJS, it is not a good example of how to write a React or NestJS application.

This demo runs a simple image board application. It allows users to upload images or text in threads. It is composed of:

- A [React](https://reactjs.org/) frontend
- A [NestJS](https://nestjs.com/) backend
- A [PostgreSQL](https://www.postgresql.org/) database
- Uses [MinIO](https://min.io/) as an object storage
