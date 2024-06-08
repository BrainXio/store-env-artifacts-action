const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    // Get inputs
    const artifactDir = core.getInput('artifact-dir');
    const appName = core.getInput('app-name');
    const builderImageVersion = core.getInput('builder-image-version');
    const buildId = core.getInput('build-id');
    const builderId = core.getInput('builder-id');
    const imageTag = core.getInput('image-tag');
    const safeBasename = core.getInput('safe-basename');
    const jobType = core.getInput('job-type');

    // Create artifact directory
    if (!fs.existsSync(artifactDir)) {
      fs.mkdirSync(artifactDir, { recursive: true });
    }

    // Store environment variables as files
    fs.writeFileSync(path.join(artifactDir, 'app_name.txt'), appName);
    fs.writeFileSync(path.join(artifactDir, 'builder_image_version.txt'), builderImageVersion);
    fs.writeFileSync(path.join(artifactDir, 'build_id.txt'), buildId);
    fs.writeFileSync(path.join(artifactDir, 'builder_id.txt'), builderId);
    fs.writeFileSync(path.join(artifactDir, 'image_tag.txt'), imageTag);

    // Set the artifact name for uploading
    const artifactName = `${safeBasename}-${builderImageVersion}-${jobType}`;
    core.setOutput('artifact-name', artifactName);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
