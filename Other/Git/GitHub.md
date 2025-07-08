<link rel="stylesheet" type="text/css" href="styles.css">

# Features
- Issue Tracing, using to trace the issues.
- Pull Request, using code review and merge other branch back to master branch.
  - Determine Reviewers that they can review and comment the code you pushed.
- GitHub Action, Automation and CI/CD.
- GitHub Page, Deploy a static website.
- GitHub Discussions, Discussions.
- GitHub Wiki, The tool for writing shared documents.
- GitHub Template, Provides various templates to support item mangements.
- GitHub Security, Security analysis and protection.
- GitHub Codespace, Allow executing develop environment on the browser.
- Git Flow, Model of source code management
  - main branches:
    - master
    - develop
  - feature branches: 
    - For new features, based on develop branch then merge back to develop branch.
  - release branches: 
    - For release version: final testing, version update and other operators and merge back to master and develop.
  - hotfix branches:
    - For issues that need to be fixed immediately.

# GitHub Action
## Core
- Actions/commands: 在 Github Actions 中的最小單位，可以用來組合成各種的 steps 來建立你要自動化的 jobs 
- Step: 由多個 action/command 組成 step，用來定義每一個自動化流程的步驟
- Job: 多個 step 組成 job，透過 job 定義不同 scope 的任務，比如可以分為測試的 job 與 build code 的 job，執行順序會根據 yaml 中的順序來執行
- Workflow: 是整個自動化的流程，一個自動化流程可能包含多個 job

## YAML
```YAML
# The name of this workflow.
name: CI/CD

# Trigger conditions of this workflow.
on:
  push: # Push
    branches: [ master ]
  pull_request: # PR
    branches: [ master ]

# The jobs that needs to be executed of this workflow.
jobs:
  build: # Building Environment
    # The platform that be executed.
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [10.x, 12.x, 14.x]

    # Execute in order.
    steps:
    # You can define a name for each step.
    # Checkout the repository
    - name: Checkout repository
      uses: actions/checkout@v2

    # Using Specific Version
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Run the tests
      run: npm test

    - name: Build
      run: npm run build --if-present

    - name: Deploy
      run: |
        git config --global user.name $user_name
        git config --global user.email $user_email
        git remote set-url origin https://${github_token}@github.com/${repository}
        npm run deploy
    env:
        user_name: 'github-actions[bot]'
        user_email: 'github-actions[bot]@users.noreply.github.com'
        github_token: ${{ secrets.ACTIONS_DEPLOY_ACCESS_TOKEN }}
        repository: ${{ github.repository }}

```

