# Images

The site runs on **25 plates**, shared across every project,
every discipline and every page band. 15 of them are photographs and are
already in the repository; 10 are still drawings, and this file is the shot
list for those.

Photography is in `public/assets/img/lib/`. Nothing in it carries a company
name, a logo or a hard-hat decal, and there is no portrait of a named person:
every frame that did was left out.

## What is already photographed

| Plate | Appears on |
| ----- | ---------- |
| `lib/concrete-pour.webp` | Palm Ridge Outpatient Pavilion, Mesa Civic Hall Retrofit, Arroyo Seco Levee Works, Major Civil Engineering (service), /projects header |
| `lib/deck-pour.webp` | Crescent Bay Tower, Coyote Creek Crossing |
| `lib/engineers-laptop.webp` | Palm Ridge Outpatient Pavilion, Digital Engineering (service), contact band |
| `lib/highway-works.webp` | Coyote Creek Crossing, Arroyo Seco Levee Works, Major Civil Engineering (service), hero slide 3 |
| `lib/interior-fitout.webp` | Palm Ridge Outpatient Pavilion, Mesa Civic Hall Retrofit, Commercial Construction (service), /contact header |
| `lib/offshore-platform.webp` | Sable Ridge Platform Tieback |
| `lib/offshore-walkway.webp` | Harborside Jetty Rebuild |
| `lib/portal-frame.webp` | Canyon Ridge Logistics Centre, Steel Fabrication and Erection (service), /careers header |
| `lib/power-plant.webp` | Sierra Vista Cogeneration Plant, Commissioning and Handover (service) |
| `lib/process-plant.webp` | Vista Bay Tank Terminal, Kestrel Field Turnaround, Oil and Gas Facilities (service), selected work band |
| `lib/rebar-mat.webp` | Crescent Bay Tower, Mesa Civic Hall Retrofit, Coyote Creek Crossing, Structural Engineering (service), Groundworks and Foundations (service) |
| `lib/rig-inspection.webp` | Kestrel Field Turnaround, Mechanical and Process (service), practice band |
| `lib/site-overview.webp` | Canyon Ridge Logistics Centre, Arroyo Seco Levee Works, Groundworks and Foundations (service), site underlay + hero, hero slide 1 |
| `lib/steel-erection.webp` | Crescent Bay Tower, Canyon Ridge Logistics Centre, Commercial Construction (service), Structural Engineering (service), capabilities band + hero, hero slide 2 |
| `lib/steel-stack.webp` | Steel Fabrication and Erection (service) |

**Page images.** The five landing-page slots (`meridian1` … `meridian5`) run on
library plates until you drop your own in. To override one, put a file named
`meridian1` … `meridian5` (any of `.webp`, `.avif`, `.jpg`, `.jpeg`, `.png`) into
`public/assets/img/` and rebuild — no code change, no data edit.

---

# Still to shoot (11)

These slots run a Meridian drawing until a photograph replaces them. Each prompt
below is complete — scene, camera settings, house style, aspect ratio — so it can
be pasted into an image tool as it is. Put the negative prompt in the negative
field.

**To install one:** save it as the filename in the heading, under
`public/assets/img/`, then run `npm run adopt-photos` and `npm run build`. The
leadership portrait needs `npm run adopt-photos` too.

## The negative prompt

> stock photo, corporate brochure, glossy, plastic skin, staged handshake,
> thumbs up, arms folded smiling at camera, pristine hi-vis, clean boots, studio
> lighting, softbox, HDR halo, orange-teal grade, oversaturated, heavy vignette,
> lens flare, CGI, 3D render, illustration, matte painting, watermark, caption
> text, company logos, branded hi-vis, hard hat decals, extra fingers, warped
> hands, impossible rigging, floating loads, people standing under suspended loads

## The camera set-ups used below

| Set-up | Written into the prompt as |
| ------ | -------------------------- |
| **A — wide exterior** | 24 mm at f/8, 1/500s, ISO 100, overcast or an hour before sunset, deep focus |
| **B — working detail** | 50 mm at f/2, 1/160s, ISO 800, available light, shallow depth of field |
| **E — underwater** | 20 mm in a housing at f/5.6, 1/125s, ISO 1600, two video lights, particulate, falloff to black |
| **F — portrait** | 85 mm at f/2, 1/250s, ISO 400, open shade, no fill flash |

---
### `public/assets/img/lib/tank-shell.jpg` — Storage tank under construction
*Replaces the drawing at `lib/tank-shell.svg`. Appears on: Vista Bay Tank Terminal, Oil and Gas Facilities (service).*

> Large steel storage tanks under construction in a terminal: one shell
> part-built with courses stacked and tacked, a completed tank behind,
> containment berm earthworks in the foreground, pipe rack running across the
> frame. Dusty ground, distant flare stack out of focus. Shot on a full-frame
> camera, 24 mm lens at f/8, 1/500s, ISO 100, overcast daylight or an hour
> before sunset, deep focus front to back. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. Unbranded
> workwear: no company name, logo or decal on any hard hat, vest or hoarding.
> No HDR, no gloss, no lens flare, no text, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/weld-habitat-tent.jpg` — Welding under cover
*Replaces the drawing at `lib/weld-habitat-tent.svg`. Appears on: Vista Bay Tank Terminal, Kestrel Field Turnaround, Mechanical and Process (service).*

> Inside a welding habitat tent on a live site: a pipe spool fitted up, purge
> hose taped at the joint, heat blanket on the weld, welder seated on a bucket
> with the hood up waiting on a preheat reading, chalk weld numbers on the
> pipe. Task light, honest deep shadows. Shot on a full-frame camera, 50 mm
> lens at f/2, 1/160s, ISO 800, available light only, shallow depth of field
> falling off behind the subject. Documentary construction photography, real
> working site, natural available light, native grain retained, muted
> mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves,
> muddy boots; weld spatter, chalk marks and rust bloom on the surfaces.
> Candid imperfect framing, nobody posing for the camera. Unbranded workwear:
> no company name, logo or decal on any hard hat, vest or hoarding. No HDR, no
> gloss, no lens flare, no text, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/diver-underwater.jpg` — Diver at work underwater
*Replaces the drawing at `lib/diver-underwater.svg`. Appears on: Sable Ridge Platform Tieback, Seabright Outfall Repair, Underwater and Marine Welding (service).*

> Surface-supplied commercial diver working on a steel pile underwater:
> brass-and-fibreglass dive helmet, umbilical trailing up out of frame, gloved
> hand on a repair jacket band, marine growth on the steel below it.
> Green-blue water, particulate in the beam of the video light, black beyond.
> Shot on a full-frame camera in an underwater housing, 20 mm lens at f/5.6,
> 1/125s, ISO 1600, two video lights at low power, green-blue water column
> with visible particulate and light falling off to black. Documentary
> construction photography, real working site, natural available light, native
> grain retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty
> hi-vis, greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom
> on the surfaces. Candid imperfect framing, nobody posing for the camera.
> Unbranded workwear: no company name, logo or decal on any hard hat, vest or
> hoarding. No HDR, no gloss, no lens flare, no text, no watermark. Aspect
> ratio 3:2.

### `public/assets/img/lib/dive-spread-deck.jpg` — Dive spread at the surface
*Replaces the drawing at `lib/dive-spread-deck.svg`. Appears on: Harborside Jetty Rebuild, Seabright Outfall Repair, Underwater and Marine Welding (service).*

> Dive station on a barge: tender at the control rack watching gauges,
> umbilical flaked on deck, dive stage on the crane hook, a diver in a hat
> about to step off, a working wharf and a ship behind. Overcast harbour
> light, wet steel deck. Shot on a full-frame camera, 24 mm lens at f/8,
> 1/500s, ISO 100, overcast daylight or an hour before sunset, deep focus
> front to back. Documentary construction photography, real working site,
> natural available light, native grain retained, muted mid-tones, honest
> neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld
> spatter, chalk marks and rust bloom on the surfaces. Candid imperfect
> framing, nobody posing for the camera. Unbranded workwear: no company name,
> logo or decal on any hard hat, vest or hoarding. No HDR, no gloss, no lens
> flare, no text, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/dive-bell-moonpool.jpg` — Saturation bell on the moon pool
*Replaces the drawing at `lib/dive-bell-moonpool.svg`. Appears on: Sable Ridge Platform Tieback.*

> A saturation diving bell suspended over an open moon pool, tenders in hard
> hats guiding it, umbilical bundle, wet steel grating, the water below lit
> from beneath. Industrial interior lighting, breath visible in the cold air.
> Shot on a full-frame camera, 50 mm lens at f/2, 1/160s, ISO 800, available
> light only, shallow depth of field falling off behind the subject.
> Documentary construction photography, real working site, natural available
> light, native grain retained, muted mid-tones, honest neutral whites.
> Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter, chalk
> marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. Unbranded workwear: no company name, logo or decal on
> any hard hat, vest or hoarding. No HDR, no gloss, no lens flare, no text, no
> watermark. Aspect ratio 3:2.

### `public/assets/img/lib/subsea-clamp.jpg` — Subsea repair clamp
*Replaces the drawing at `lib/subsea-clamp.svg`. Appears on: Seabright Outfall Repair.*

> A split repair clamp bolted over a dented pipeline section on the seabed, a
> diver torquing a bolt with a hydraulic wrench, silt kicked up around the
> work, anodes and marine growth on the pipe either side, visibility closing
> in beyond two metres. Shot on a full-frame camera in an underwater housing,
> 20 mm lens at f/5.6, 1/125s, ISO 1600, two video lights at low power,
> green-blue water column with visible particulate and light falling off to
> black. Documentary construction photography, real working site, natural
> available light, native grain retained, muted mid-tones, honest neutral
> whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter,
> chalk marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. Unbranded workwear: no company name, logo or decal on
> any hard hat, vest or hoarding. No HDR, no gloss, no lens flare, no text, no
> watermark. Aspect ratio 3:2.

### `public/assets/img/lib/wharf-underdeck.jpg` — Wharf underdeck
*Replaces the drawing at `lib/wharf-underdeck.svg`. Appears on: Harborside Jetty Rebuild.*

> Beneath a wharf deck at low tide: a forest of piles, chloride staining and
> spalled concrete on the pile caps, an inspector in a small boat with a
> headlamp and a clipboard, hard shafts of daylight falling between the beams
> onto the water. Shot on a full-frame camera, 50 mm lens at f/2, 1/160s, ISO
> 800, available light only, shallow depth of field falling off behind the
> subject. Documentary construction photography, real working site, natural
> available light, native grain retained, muted mid-tones, honest neutral
> whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter,
> chalk marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. Unbranded workwear: no company name, logo or decal on
> any hard hat, vest or hoarding. No HDR, no gloss, no lens flare, no text, no
> watermark. Aspect ratio 3:2.

### `public/assets/img/lib/switchyard-lattice.jpg` — Switchyard structures
*Replaces the drawing at `lib/switchyard-lattice.svg`. Appears on: Sierra Vista Cogeneration Plant, Commissioning and Handover (service).*

> A high-voltage switchyard under construction on dry ground: galvanised
> lattice structures going up, insulator stacks set, bus work overhead, gravel
> yard and chain-link fence, hills low on the horizon through heat haze. Harsh
> dry light. Shot on a full-frame camera, 24 mm lens at f/8, 1/500s, ISO 100,
> overcast daylight or an hour before sunset, deep focus front to back.
> Documentary construction photography, real working site, natural available
> light, native grain retained, muted mid-tones, honest neutral whites.
> Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter, chalk
> marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. Unbranded workwear: no company name, logo or decal on
> any hard hat, vest or hoarding. No HDR, no gloss, no lens flare, no text, no
> watermark. Aspect ratio 3:2.

### `public/assets/img/lib/transformer-set.jpg` — Transformer set
*Replaces the drawing at `lib/transformer-set.svg`. Appears on: Sierra Vista Cogeneration Plant.*

> A large power transformer being lowered onto its foundation by two cranes,
> riggers on tag lines well clear of the load, oil containment pit and pier
> caps visible below, cracked dry ground, energised yard behind. Shot on a
> full-frame camera, 24 mm lens at f/8, 1/500s, ISO 100, overcast daylight or
> an hour before sunset, deep focus front to back. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. Unbranded
> workwear: no company name, logo or decal on any hard hat, vest or hoarding.
> No HDR, no gloss, no lens flare, no text, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/model-review.jpg` — Model review
*Replaces the drawing at `lib/model-review.svg`. Appears on: Digital Engineering (service).*

> Two engineers in a site trailer comparing a federated 3D model on a large
> monitor against a printed drawing pinned to the wall, a tablet on the desk
> showing the same detail, both mid-conversation and not looking at the
> camera. Model visible as shapes rather than legible data. Window light from
> the side. Shot on a full-frame camera, 50 mm lens at f/2, 1/160s, ISO 800,
> available light only, shallow depth of field falling off behind the subject.
> Documentary construction photography, real working site, natural available
> light, native grain retained, muted mid-tones, honest neutral whites.
> Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter, chalk
> marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. Unbranded workwear: no company name, logo or decal on
> any hard hat, vest or hoarding. No HDR, no gloss, no lens flare, no text, no
> watermark. Aspect ratio 3:2.

### `public/assets/img/leadership.jpg` — Leadership portrait
*Replaces the drawing at `leadership.svg`. Appears on: leadership chapter.*

> Environmental portrait of a principal engineer in their fifties at a site
> boundary, hard hat under one arm, hi-vis over a plain shirt, reading glasses
> hooked on the collar. Steel frame soft behind them. Open shade, even light
> on the face, expression neutral and direct, not smiling for the camera. Skin
> texture retained, no smoothing. Plain unbranded workwear. Shot on a
> full-frame camera, 85 mm lens at f/2, 1/250s, ISO 400, open shade or
> north-facing window light, no fill flash. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. Unbranded
> workwear: no company name, logo or decal on any hard hat, vest or hoarding.
> No HDR, no gloss, no lens flare, no text, no watermark. Aspect ratio 4:5.

---

## Rules the build enforces

`npm run artwork` fails if any of these break, so reuse never reads as a
mistake:

- no plate appears twice on the same page;
- no two projects share a hero image;
- no plate points at a drawing that does not exist.

`npm run build` also prunes any project or service page whose id has gone from
the data, so a renamed project cannot leave a stale page behind.

## House rules for anything added later

- No company name, logo, or hard-hat decal on workwear, hoarding, plant or
  skips. A frame that carries one does not go on the site.
- No portrait of a named person unless that person is actually at the practice.
- Ordinary light. If a generator keeps returning sunsets and lens flare, put
  `overcast, midday, flat light` at the front of the prompt.
- Underwater frames need `visible backscatter, limited visibility, light falloff
  to black`; clear blue tropical water reads as a holiday photograph.
