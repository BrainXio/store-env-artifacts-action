# store-env-artifacts

## Overview

Hey there, wonderful human! 🤖 `store-env-artifacts` is a GitHub Action that captures and stores essential environment variables as artifacts during your CI/CD pipeline. This action helps maintain a record of important build information and ensures you can access it later for auditing or other purposes.

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

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install @actions/core @actions/github

      - name: Run store-env-artifacts action
        id: store-env
        uses: your-username/store-env-artifacts@v1
        with:
          artifact-dir: 'artifacts'
          app-name: 'MyApp'
          builder-image-version: '1.0.0'
          build-id: 'build_12345'
          builder-id: 'builder_67890'
          image-tag: 'latest'
          safe-basename: 'myapp-artifact'
          latest-tag: '1.next'
          job-type: 'test'

      - name: Upload Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ${{ steps.store-env.outputs.artifact-name }}
          path: artifacts

      - name: List artifacts directory contents
        run: ls artifacts

      - name: Verify APP_NAME
        run: |
          echo "Verifying APP_NAME:"
          echo "APP_NAME: $(cat artifacts/app_name.txt)"

      - name: Verify BUILDER_IMAGE_VERSION
        run: |
          echo "Verifying BUILDER_IMAGE_VERSION:"
          echo "BUILDER_IMAGE_VERSION: $(cat artifacts/builder_image_version.txt)"

      - name: Verify build_id.txt
        run: |
          echo "Verifying build_id.txt:"
          echo "Contents of build_id.txt:"
          cat artifacts/build_id.txt

      - name: Verify builder_id.txt
        run: |
          echo "Verifying builder_id.txt:"
          echo "Contents of builder_id.txt:"
          cat artifacts/builder_id.txt

      - name: Verify image_tag.txt
        run: |
          echo "Verifying image_tag.txt:"
          echo "Contents of image_tag.txt:"
          cat artifacts/image_tag.txt

      - name: Verify latest_tag.txt
        run: |
          echo "Verifying latest_tag.txt:"
          echo "Contents of latest_tag.txt:"
          cat artifacts/latest_tag.txt
```

### Inputs

- `artifact-dir`: The directory where the artifacts will be saved.
- `app-name`: The name of the application.
- `builder-image-version`: The version of the builder image.
- `build-id`: The unique ID of the build.
- `builder-id`: The unique ID of the builder.
- `image-tag`: The tag of the image.
- `safe-basename`: The base name used for the artifact.
- `latest-tag`: The latest tag version.
- `job-type`: The type of job for which the report will be generated.

### Outputs

- `artifact-name`: The name of the generated artifact.

### Security and Best Practices

**Environment Variables**: Ensure all necessary environment variables are set.

**File Paths**: Validate and sanitize file paths to prevent security vulnerabilities.

**Error Handling**: Properly handle errors to avoid unexpected failures.

## Contributing

We welcome contributions to improve the action. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the Unlicense License. See the [LICENSE](LICENSE) file for details.
