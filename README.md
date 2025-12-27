# Personal CV Web Page

This project is a personal CV web page built with React and TypeScript. It showcases various projects, provides detailed project pages, and includes a responsive design for mobile compatibility.
See [here](http://jonas.mailbase.info) for an example where this template is used or [here](http://danielroth1.github.io/CVWebpageTemplate/) for the original author's demo page.

## Features
- modern design
- mobile compatible
- easily customizable, you don't even need to know React
- light / dark mode
- count lines of codes (see multi-loc-config.json and cloc-mapping.json)

## How to use
Fork (if you want) or clone the repository directly:
```
git clone git@github.com:danielroth1/CVWebpageTemplate.git
```

You only have add the content via files in the `/src/data` folder. 
After you have done the following customizations:
- Add your resume information like name, title, e-mail, skills to `resume.json`
- Add your "about me" section (ABOUT_ME.md)
  - You can use the placeholder `#YEARS_OF_EXPERIENCE#` to automatically calculate and display your years of experience based on the earliest start date in `resume.json`.
- Add your "contact" page (CONTACT.md)
- Add a personal picture or use a placeholder if you are not comfortable with it (peronal_photo.jpg)
- Add your own projects as a display of your achievements
  - Add a project description (projects.json + `README.md` inside `projects/<project-name>/`)
  - Add a preview image for each project `/projects/<project-name>/preview.<video-extension>`
  - After adding new videos, run `npm run compress-videos`
  - Automatically count all lines of code: Specify the projects source location in `/multi-loc-config.json` and run `npm run multi-loc`. Alternatively, manually change the count in `/projects/<project-name>/cloc.json`
- Clone your project repositories into `git_projects/` folder to include them in automated code statistics
  - Run `npm run update-git-projects` to update all repositories in the `git_projects/` folder
  - The `npm run build` command automatically runs code statistics on all repositories in `git_projects/`

optional:
- Add your resume as pdf for download (resume.pdf)
- Add a logo to your website by placing any image to `/src/data/logo.<image-extension>` and running `npm run make-favicon`
- Color match your skills by grouping them in `skills.json`
- Change the Skill colors in `/src/utils/SkillColors.ts`

Set it up
```
npm run install
```

Try it out
```
npm run dev
```

Create distributable
```
npm run build
```

and deploy it. I have provided a script for deployment on a ftp file server, see scripts/deploy.sh
```
./scripts/deploy.sh
```

### Optional
Create your favicon
```
npm run make-favicon
```

Create code statistics
```
npm run multi-loc
```

Update all git repositories in git_projects/
```
npm run update-git-projects
```

Compress your videos (recommended)
```
npm run compress-videos
```

## Project Structure

The project is organized as follows:

```
personal-cv
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── index.tsx          # Entry point of the React application
│   ├── App.tsx            # Main App component with routing
│   ├── routes.tsx         # Defines application routes
│   ├── pages               # Contains page components
│   │   ├── Home.tsx       # Home page component
│   │   ├── Projects.tsx    # Projects overview page
│   │   └── ProjectDetail.tsx # Detailed project page
│   ├── components          # Reusable components
│   │   ├── Header.tsx      # Header component
│   │   ├── Sidebar.tsx     # Sidebar navigation component
│   │   ├── Footer.tsx      # Footer component
│   │   ├── ProjectList.tsx  # List of projects
│   │   ├── ProjectCard.tsx  # Individual project card
│   │   └── MobileNav.tsx    # Mobile navigation menu
│   ├── hooks               # Custom hooks
│   │   └── useWindowSize.ts # Hook for window size
│   ├── data                # Data files
│   │   └── projects.ts      # Project data
│   ├── styles              # CSS styles
│   │   ├── globals.css      # Global styles
│   │   └── components.css    # Component-specific styles
│   ├── utils               # Utility functions
│   │   └── helpers.ts       # Helper functions
│   └── types               # TypeScript types
│       └── index.ts         # Type definitions
├── package.json            # NPM configuration
├── tsconfig.json           # TypeScript configuration
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```
   cd personal-cv
   ```

3. **Install dependencies:**
   ```
   npm install
   ```

4. **Run the application:**
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Features

- Overview of various projects with clickable links leading to detailed pages.
- Responsive design for mobile compatibility.
- Sidebar navigation for easy access to different sections of the CV.

## License

This project is licensed under the MIT License.

## Additional Pages

### About page

- Create or edit `src/data/ABOUT_ME.md` to populate the About page at `/about`.

### Contact page

- The Contact page at `/contact` loads markdown from `src/data/CONTACT.md`.
- Create or edit `src/data/CONTACT.md` to customize the introductory text (supports GitHub-flavored markdown).
- The page still uses `profile.email` from `resume.json` for the mailto button; keep that field updated.

- Place a `resume.pdf` in the `public/` folder to enable the Download Resume button and inline PDF preview.

### Icons

- The navigation includes icons via `react-icons` (Home, Projects, About, Resume).

## Video embeds and Safari stability

Project pages can embed short demo videos in markdown using a custom tag, for example:

```
<webm src="./preview.webm" max-width="600" />
```

Under the hood the app will prefer an H.264 MP4 fallback on Safari and load videos lazily with `preload="none"` to improve stability on mobile browsers. For best results, generate compressed variants next to your original files:

```
npm run compress-videos
```

This creates `[name].min.webm` (VP9) and `[name].min.mp4` (H.264) beside each `*.webm` under `src/data/**`. The renderer will automatically use these smaller variants when available. Requires `ffmpeg` (macOS: `brew install ffmpeg`).

## Automated skill groups

- Run `npm run build-skills` (or rely on the automatic call that runs before `npm run dev` and `npm run build`) to regenerate `src/data/skills.json` from `src/data/resume.json` and `src/data/projects.json`.
- The generator is implemented in `scripts/build-skills.js` and:
   - preserves resume categories as ordered groups,
   - deduplicates skills across sources,
   - collects project-only skills into a `Project Skills` group,
   - exposes `metadata.singleUseSkills` for skills that appear in exactly one project.
- Run the generator manually to inspect results or integrate it in CI before publishing.

## Custom markdown tags

| Tag | Purpose | Example usage |
| --- | --- | --- |
| ``<webm>`` | Responsive video embed with automatic MP4/WebM fallbacks. | ``<webm src="./preview.webm" max-width="640" autoplay />`` |
| ``<youtube>`` | Lightweight YouTube iframe wrapper. | ``<youtube id="dQw4w9WgXcQ" />`` |
| ``<skill>`` | Renders a colored skill badge inline with text. | ``Mastered <skill>React</skill> for the UI.`` |
| ``<btn>`` | Generic icon button; set `kind="browser"`, `kind="download"`, etc. | ``<btn kind="browser" browser="firefox" href="https://mozilla.org">Open in Firefox</btn>`` |
| ``<github>`` | GitHub button matching the component styling. | ``<github href="https://github.com/you/repo">View on GitHub</github>`` |
| ``<linkedin>`` | LinkedIn call-to-action button. | ``<linkedin href="https://linkedin.com/in/you">Connect on LinkedIn</linkedin>`` |
| ``<website>`` | Neutral website button (covers the requested `<webside>` tag). | ``<website href="https://mailbase.info">Portfolio</website>`` |
| ``<download>`` / ``<windows>`` / ``<macos>`` / ``<linux>`` | Download buttons with platform icons; `<download>` accepts `os="windows"`. | ``<windows href="./app.exe">Download for Windows</windows>`` |
| ``<firefox>`` / ``<chrome>`` | Browser-specific buttons that link to hosted demos. | ``<chrome href="https://demo.com">Try in Chrome</chrome>`` |
| ``<highlight>`` | Emphasized content block with optional `title` and `shadow`. | ``<highlight title="Key Takeaway">Ship early and iterate.</highlight>`` |
| ``<email>`` | Mailto button that defaults to the resume email when `href` is omitted. | ``<email>Get in touch</email>`` |

All of these tags are wired up inside [src/utils/markdownComponents.ts](src/utils/markdownComponents.ts), so you can review or extend them as needed.
