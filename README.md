# store-env-artifacts

## Overview

Hey there, wonderful human! 🤖 `store-env-artifacts` is a GitHub Action that helps you store environment variables as artifacts and upload them to your workflow. This action ensures that critical environment data is preserved and easily accessible for future use.

## Usage

### Workflow Example

To use this action, add the following step to your GitHub Actions workflow:

```yaml
name: CI/CD Pipeline

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Store Environment Variables as Artifacts
        uses: brainxio/store-env-artifacts@v1
        with:
          artifact-dir: 'path/to/artifacts'
          app-name: ${{ env.APP_NAME }}
          builder-image-version: ${{ env.BUILDER_IMAGE_VERSION }}
          build-id: ${{ env.BUILD_ID }}
          builder-id: ${{ env.BUILDER_ID }}
          image-tag: ${{ env.IMAGE_TAG }}
          safe-basename: ${{ env.SAFE_BASENAME }}
          job-type: ${{ env.JOB_TYPE }}

      - name: Upload Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ${{ steps.store-env-artifacts.outputs.artifact-name }}
          path: ${{ env.ARTIFACT_DIR }}
```

### Inputs

- `artifact-dir`: The directory to store artifacts.
- `app-name`: The application name.
- `builder-image-version`: The builder image version.
- `build-id`: The build ID.
- `builder-id`: The builder ID.
- `image-tag`: The image tag.
- `safe-basename`: Safe base name for the artifact.
- `job-type`: The job type.

### Outputs

- `artifact-name`: The name of the artifact to be uploaded.

### Security and Best Practices

**Environment Variables**: Ensure all necessary environment variables are set.

**File Paths**: Validate and sanitize file paths to prevent security vulnerabilities.

**Error Handling**: Properly handle errors to avoid unexpected failures.

## Contributing

We welcome contributions to improve the action. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the Unlicense License. See the [LICENSE](LICENSE) file for details.
