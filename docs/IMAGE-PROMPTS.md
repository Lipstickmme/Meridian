# Images

**Every picture on the site is a photograph.** There are no placeholder drawings
left: 15 plates in `public/assets/img/lib/`, shared across 11 projects,
10 disciplines and every page band. Nothing carries a company name, a logo or
a hard-hat decal, and no portrait of a named person appears anywhere.

Where a subject had no photograph, the site says nothing rather than drawing it:
the leadership chapter runs as text alone, and the subsea outfall project is off
the site until there is a diving photograph to carry it.

## What the site runs on

| Plate | Appears on |
| ----- | ---------- |
| `lib/concrete-pour.webp` | Palm Ridge Outpatient Pavilion, Mesa Civic Hall Retrofit, Arroyo Seco Levee Works, Major Civil Engineering (service), /projects header |
| `lib/deck-pour.webp` | Crescent Bay Tower, Coyote Creek Crossing |
| `lib/engineers-laptop.webp` | Palm Ridge Outpatient Pavilion, Digital Engineering (service), Commissioning and Handover (service), contact band |
| `lib/highway-works.webp` | Coyote Creek Crossing, Arroyo Seco Levee Works, Major Civil Engineering (service), hero slide 3 |
| `lib/interior-fitout.webp` | Palm Ridge Outpatient Pavilion, Mesa Civic Hall Retrofit, Commercial Construction (service), Digital Engineering (service), /contact header |
| `lib/offshore-platform.webp` | Sable Ridge Platform Tieback, Kestrel Field Turnaround, Underwater and Marine Welding (service) |
| `lib/offshore-walkway.webp` | Sable Ridge Platform Tieback, Harborside Jetty Rebuild, Underwater and Marine Welding (service) |
| `lib/portal-frame.webp` | Sierra Vista Cogeneration Plant, Canyon Ridge Logistics Centre, Steel Fabrication and Erection (service), /careers header |
| `lib/power-plant.webp` | Sierra Vista Cogeneration Plant, Commissioning and Handover (service) |
| `lib/process-plant.webp` | Vista Bay Tank Terminal, Sierra Vista Cogeneration Plant, Kestrel Field Turnaround, Oil and Gas Facilities (service), Mechanical and Process (service), selected work band |
| `lib/rebar-mat.webp` | Crescent Bay Tower, Mesa Civic Hall Retrofit, Coyote Creek Crossing, Structural Engineering (service), Groundworks and Foundations (service) |
| `lib/rig-inspection.webp` | Sable Ridge Platform Tieback, Kestrel Field Turnaround, Harborside Jetty Rebuild, Oil and Gas Facilities (service), Mechanical and Process (service), practice band |
| `lib/site-overview.webp` | Vista Bay Tank Terminal, Harborside Jetty Rebuild, Canyon Ridge Logistics Centre, Arroyo Seco Levee Works, Groundworks and Foundations (service), site underlay + hero, hero slide 1 |
| `lib/steel-erection.webp` | Crescent Bay Tower, Canyon Ridge Logistics Centre, Commercial Construction (service), Structural Engineering (service), capabilities band + hero, hero slide 2 |
| `lib/steel-stack.webp` | Vista Bay Tank Terminal, Steel Fabrication and Erection (service) |

**Page images.** The landing-page slots run on library plates. To override one,
drop a file named `meridian1` … `meridian5` (any of `.webp`, `.avif`, `.jpg`,
`.jpeg`, `.png`) into `public/assets/img/` and rebuild — no code change.

**The build checks all of it.** `npm run check:images` (which `npm run build`
runs first) fails on a path that points at nothing, the same plate twice on one
page, or two projects sharing a hero, and reports anything in `lib/` that
nothing uses.

---

# Worth shooting next (10)

Each of these would let the site show work it currently cannot. They are not
placeholders for anything — nothing is broken without them — but the first four
would bring the subsea project back, and the last would give the leadership
chapter a face.

Each prompt is complete: scene, camera settings, house style, aspect ratio.
Put the negative prompt in the negative field. Save the result at the filename
in the heading under `public/assets/img/`, then run `npm run adopt-photos` and
`npm run build`.

## The negative prompt

> stock photo, corporate brochure, glossy, plastic skin, staged handshake,
> thumbs up, arms folded smiling at camera, pristine hi-vis, clean boots, studio
> lighting, softbox, HDR halo, orange-teal grade, oversaturated, heavy vignette,
> lens flare, CGI, 3D render, illustration, matte painting, watermark, caption
> text, company logos, branded hi-vis, hard hat decals, extra fingers, warped
> hands, impossible rigging, floating loads, people standing under suspended loads

---
### `public/assets/img/lib/diver-underwater.jpg` — Diver at work underwater
*Would carry: the underwater discipline page, and the subsea project this would bring back.*

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
*Would carry: the underwater discipline, the jetty project.*

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

### `public/assets/img/lib/subsea-clamp.jpg` — Subsea repair clamp
*Would carry: the subsea outfall project.*

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
*Would carry: the jetty project.*

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

### `public/assets/img/lib/tank-shell.jpg` — Storage tank under construction
*Would carry: the tank terminal project, the oil and gas discipline.*

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
*Would carry: the turnaround projects, the mechanical discipline.*

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

### `public/assets/img/lib/switchyard-lattice.jpg` — Switchyard structures
*Would carry: the cogeneration project, the commissioning discipline.*

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
*Would carry: the cogeneration project.*

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
*Would carry: the digital engineering discipline.*

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
*Would carry: the leadership chapter, which currently runs as text alone.*

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

## House rules for anything added later

- No company name, logo, or hard-hat decal on workwear, hoarding, plant or
  skips. A frame that carries one does not go on the site.
- No portrait of a named person unless that person is actually at the practice.
- Ordinary light. If a generator keeps returning sunsets and lens flare, put
  `overcast, midday, flat light` at the front of the prompt.
- Underwater frames need `visible backscatter, limited visibility, light falloff
  to black`; clear blue tropical water reads as a holiday photograph.
- A subject with no photograph gets no picture. The site does not draw one.
