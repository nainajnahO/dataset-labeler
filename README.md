# Dataset Labeler installation page

A single-screen, static GitHub Pages site with a copyable CLI installation command and a looping video background. No build step or third-party frontend dependencies.

The command installs the CLI from the existing protected application's public software-download route. Each user then runs `dataset-labeler login` to authenticate; the site ships no credentials or dataset content.

The background is the owner-provided “My Movie.mp4” from Downloads, exported as a web-ready 720p copy with the full 14.16-second video preserved, then played muted with `object-fit: cover`. The original file stays in Downloads. It pauses for reduced-motion preferences and provides a manual playback control. The owner has requested public hosting of this page and video. The video is not covered by a software license in this repository.

Publish the `main` branch, root folder, using GitHub Pages. For a local preview: `python3 -m http.server 5188 --bind 127.0.0.1`.

The static grain matches the liquid-flow background in [Forskapong](https://github.com/nainajnahO/forskapong/blob/main/src/components/common/StaticNoise.tsx): a 450×450 random texture of transparent and half-transparent white pixels, tiled at 300px with pixelated rendering, overlay blending, and 30% opacity. The texture is generated once when the page loads and sits above the video and below the content.
