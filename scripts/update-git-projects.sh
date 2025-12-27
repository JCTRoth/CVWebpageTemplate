#!/bin/bash
# update-git-projects.sh
# ----------------------
# Updates all git repositories in the git_projects folder by pulling the latest changes.
# This script is useful for keeping all project repositories up to date for code statistics.

GIT_PROJECTS_DIR="$(dirname "$0")/../git_projects"

if [ ! -d "$GIT_PROJECTS_DIR" ]; then
  echo "Error: git_projects directory not found at $GIT_PROJECTS_DIR"
  exit 1
fi

cd "$GIT_PROJECTS_DIR"

echo "Updating all git repositories in $GIT_PROJECTS_DIR..."

for dir in */; do
  if [ -d "$dir/.git" ]; then
    echo "Updating $dir"
    cd "$dir"
    if git pull --quiet; then
      echo "  ✓ Updated successfully"
    else
      echo "  ✗ Failed to update"
    fi
    cd ..
  else
    echo "Skipping $dir (not a git repository)"
  fi
done

echo "Repository update complete."