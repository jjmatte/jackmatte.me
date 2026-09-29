# Project clips

Short, silent, looping screen recordings that show a project in action.
Referenced from a project's frontmatter as `clip: "/clips/<name>.mp4"` and
rendered as an autoplaying, muted, looping `<video>` on the project's detail page.

## Making one

Record 8–15 seconds of the app (window only), then compress it hard:

```bash
ffmpeg -i raw.mp4 -an -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 28 -movflags +faststart clip.mp4
```

`-an` strips audio, `-crf 28` shrinks it (raise to 30–32 for smaller), `+faststart`
lets it start before it finishes downloading. Aim for well under ~3 MB per clip.
Drop the file here and point the project's `clip` field at it.
