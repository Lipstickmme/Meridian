# Image prompts

**Thirty-five photographs run the whole site.** Six carry the landing page and
its headers; the other twenty-nine are a shared library that every project and
every discipline draws from, so a wharf repair looks like a wharf repair
whichever job it was on.

Each prompt below is complete: scene, camera settings, house style and aspect
ratio in one block. Copy it, paste it into the image tool, put the negative
prompt in the negative field, and go.

## How to use it

1. Generate the image from the prompt.
2. Save it at the filename in the heading, under `public/assets/`.
3. Run `npm run adopt-photos` (the six page images skip this — the build picks
   them up on its own).
4. Run `npm run build`.

| What | Where it goes | Picked up by |
| ---- | ------------- | ------------ |
| Page images | `public/assets/img/meridian1.jpg` … `meridian5.jpg`, `leadership.jpg` | the build / `adopt-photos` |
| Library plates | `public/assets/img/lib/<name>.jpg` | `npm run adopt-photos` |

Shoot every library plate at **3:2**. The site crops it to 16:10 in the
galleries and 3:2 on the hero, and alternate frames are cropped off-centre so
a plate used twice on a page never reads as the same picture pasted twice.
`.webp` beats `.jpg` if both are present. Keep files under ~400 KB.

**Two rules the build enforces**, so reuse never looks like a mistake: no plate
appears twice on the same page, and no two projects share a hero. `npm run
artwork` fails loudly if either is broken.

---

## The negative prompt

The one thing not inside each prompt, because most tools take it in a field of
its own. Paste it every time.

> stock photo, corporate brochure, glossy, plastic skin, staged handshake,
> thumbs up, arms folded smiling at camera, pristine hi-vis, clean boots, studio
> lighting, softbox, HDR halo, orange-teal grade, oversaturated, heavy vignette,
> lens flare, CGI, 3D render, illustration, matte painting, watermark, caption
> text, brand logos, extra fingers, warped hands, impossible rigging, floating
> loads, people standing under suspended loads

If your tool has no negative field, append it as `Avoid: <the list above>`.

## The six camera set-ups

Reference only — the right one is already written into each prompt. Swap one for
another to get a different read of the same scene.

| Set-up | Written into the prompt as |
| ------ | -------------------------- |
| **A — wide exterior** | 24 mm at f/8, 1/500s, ISO 100, overcast or an hour before sunset, deep focus |
| **B — working detail** | 50 mm at f/2, 1/160s, ISO 800, available light, shallow depth of field |
| **C — compressed telephoto** | 135 mm at f/4, 1/640s, ISO 200, shot from across the site |
| **D — night / turnaround** | 35 mm at f/1.8, 1/60s, ISO 3200, sodium and LED task light, uncorrected |
| **E — underwater** | 20 mm in a housing at f/5.6, 1/125s, ISO 1600, two video lights, particulate, falloff to black |
| **F — portrait** | 85 mm at f/2, 1/250s, ISO 400, open shade, no fill flash |

---

# A. Page images (6)

These carry the landing page and the section headers. `meridian1` is the one to
get right — it sits behind the whole site.

### `public/assets/img/meridian1.jpg`
*Site underlay, and the first hero slide.*

> Wide establishing shot of a large construction site at the end of the
> working day: a steel frame six floors up, a tower crane jib across the top
> third of the frame, stacked steel and timber dunnage in the middle ground, a
> haul road cutting left to right with tyre-printed mud. Low sun behind thin
> coastal cloud, long soft shadows, dust hanging in the light. Calm empty
> space through the middle of the frame where a headline will sit. Shot on a
> full-frame camera, 24 mm lens at f/8, 1/500s, ISO 100, overcast daylight or
> an hour before sunset, deep focus front to back. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. No HDR, no
> gloss, no lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/meridian2.jpg`
*Capabilities chapter, and the second hero slide.*

> Two trades working in the same volume: a steel erector on a beam bolting a
> connection while, below, a concrete crew screeds a deck pour. Shot from an
> adjacent floor slab through the frame, so columns and rebar frame the view.
> Flat overcast light, wet concrete sheen, chalk lines on the deck. Shot on a
> full-frame camera, 24 mm lens at f/8, 1/500s, ISO 100, overcast daylight or
> an hour before sunset, deep focus front to back. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. No HDR, no
> gloss, no lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/meridian3.jpg`
*Practice chapter, the careers header, and the third hero slide.*

> Four engineers around a drawing laid on a plywood table in a site trailer,
> one pointing at a detail with a pen, another holding a tablet showing a 3D
> model, coffee cups and a hard hat on the corner of the table. Daylight
> through a dusty window on the left, fluorescent tube overhead, papers
> curling at the edges. Nobody looking at the camera. Shot on a full-frame
> camera, 50 mm lens at f/2, 1/160s, ISO 800, available light only, shallow
> depth of field falling off behind the subject. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. No HDR, no
> gloss, no lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/meridian4.jpg`
*Selected work chapter, and the projects page header.*

> Compressed telephoto of a finished mid-rise commercial building against a
> working port skyline: cranes, stacked containers and a bridge span layered
> behind it by the long lens. Late-afternoon haze, real atmospheric
> perspective, no sun star. Shot on a full-frame camera, 135 mm lens at f/4,
> 1/640s, ISO 200, taken from across the site so the background compresses
> onto the subject. Documentary construction photography, real working site,
> natural available light, native grain retained, muted mid-tones, honest
> neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld
> spatter, chalk marks and rust bloom on the surfaces. Candid imperfect
> framing, nobody posing for the camera. No HDR, no gloss, no lens flare, no
> text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/meridian5.jpg`
*Contact chapter, and the contact page header.*

> A site office desk at the end of a shift: a marked-up drawing set weighed
> down by a tape measure, a radio, a laptop showing a coordination model out
> of focus behind, a spare hard hat on the chair. Warm late light across the
> desk from a window out of frame. Shot on a full-frame camera, 50 mm lens at
> f/2, 1/160s, ISO 800, available light only, shallow depth of field falling
> off behind the subject. Documentary construction photography, real working
> site, natural available light, native grain retained, muted mid-tones,
> honest neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy
> boots; weld spatter, chalk marks and rust bloom on the surfaces. Candid
> imperfect framing, nobody posing for the camera. No HDR, no gloss, no lens
> flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/leadership.jpg`
*Leadership chapter on the landing page.*

> Environmental portrait of a principal engineer in their fifties at a site
> boundary, hard hat under one arm, hi-vis over a plain shirt, reading glasses
> hooked on the collar. Steel frame soft behind them. Open shade, even light
> on the face, expression neutral and direct, not smiling for the camera. Skin
> texture retained, no smoothing. Shot on a full-frame camera, 85 mm lens at
> f/2, 1/250s, ISO 400, open shade or north-facing window light, no fill
> flash. Documentary construction photography, real working site, natural
> available light, native grain retained, muted mid-tones, honest neutral
> whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter,
> chalk marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 4:5.

---

# B. The shared library (29)

Each plate is used in the places listed under it. Shoot it once.

### `public/assets/img/lib/steel-frame-erection.jpg` — Steel frame erection
*Appears on: Harbor Gateway Tower, Commercial Construction (service).*

> A commercial building at structural topping-out: bare steel frame, metal
> deck on the upper floors, a concrete core rising one level higher, tower
> crane in frame, city street below with pedestrian hoarding and traffic
> control. Overcast midday, cool flat light. Shot on a full-frame camera, 24
> mm lens at f/8, 1/500s, ISO 100, overcast daylight or an hour before sunset,
> deep focus front to back. Documentary construction photography, real working
> site, natural available light, native grain retained, muted mid-tones,
> honest neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy
> boots; weld spatter, chalk marks and rust bloom on the surfaces. Candid
> imperfect framing, nobody posing for the camera. No HDR, no gloss, no lens
> flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/bolt-up-height.jpg` — Bolt-up at height
*Appears on: Harbor Gateway Tower, Civic Center Seismic Retrofit, Structural Engineering (service), Steel Fabrication and Erection (service).*

> Two ironworkers bolting a moment connection on an open floor high above a
> city, one with a spud wrench and a bolt bag, fall-arrest lanyard clipped to
> a static line, mill scale and layout chalk on the flange. Wind moving their
> hi-vis, ground far below thrown out of focus. Shot on a full-frame camera,
> 50 mm lens at f/2, 1/160s, ISO 800, available light only, shallow depth of
> field falling off behind the subject. Documentary construction photography,
> real working site, natural available light, native grain retained, muted
> mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves,
> muddy boots; weld spatter, chalk marks and rust bloom on the surfaces.
> Candid imperfect framing, nobody posing for the camera. No HDR, no gloss, no
> lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/core-slipform.jpg` — Core slipform
*Appears on: Harbor Gateway Tower.*

> Looking up the face of a concrete core being slipformed: the working
> platform ringed with plywood and scaffold, hydraulic jacks and hoses at the
> edge, steel frame two floors lower around it. Grey sky, concrete dust over
> everything. Shot on a full-frame camera, 24 mm lens at f/8, 1/500s, ISO 100,
> overcast daylight or an hour before sunset, deep focus front to back.
> Documentary construction photography, real working site, natural available
> light, native grain retained, muted mid-tones, honest neutral whites.
> Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter, chalk
> marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/rebar-cage.jpg` — Reinforcement before the pour
*Appears on: Civic Center Seismic Retrofit, Structural Engineering (service), Groundworks and Foundations (service).*

> A dense rebar cage tied by hand before a pour, chairs and spacers under the
> bars, a rebar worker gloved hands mid-tie at the edge of frame, formwork
> stacked behind, low sun raking across the steel. Shot on a full-frame
> camera, 50 mm lens at f/2, 1/160s, ISO 800, available light only, shallow
> depth of field falling off behind the subject. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. No HDR, no
> gloss, no lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/curtain-wall.jpg` — Curtain wall going on
*Appears on: Commercial Construction (service).*

> A glazing crew landing a curtain wall unit on a floor edge: two workers
> guiding it on tag lines, vacuum lifter, safety line clipped, the street
> visible below through the opening. Reflections in the glass show a grey sky,
> not a sunset. Shot on a full-frame camera, 50 mm lens at f/2, 1/160s, ISO
> 800, available light only, shallow depth of field falling off behind the
> subject. Documentary construction photography, real working site, natural
> available light, native grain retained, muted mid-tones, honest neutral
> whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter,
> chalk marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/night-pour.jpg` — Night pour
*Appears on: Katella Medical Pavilion.*

> Night concrete pour: pump truck boom over a deck, crew screeding under
> portable lights, wet concrete glare, the lit windows of an occupied building
> twenty metres away. Mixed colour temperature left uncorrected. Shot on a
> full-frame camera, 35 mm lens at f/1.8, 1/60s, ISO 3200, mixed sodium
> vapour, LED task light and moonlight, colour temperatures left uncorrected.
> Documentary construction photography, real working site, natural available
> light, native grain retained, muted mid-tones, honest neutral whites.
> Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter, chalk
> marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/crane-lift.jpg` — Module lift
*Appears on: Katella Medical Pavilion.*

> A pre-assembled plant module in the air under a crawler crane, taglines
> running down to the deck, riggers looking up, an existing building roofline
> behind. Long lens compression, bare overcast sky, nobody standing under the
> load. Shot on a full-frame camera, 135 mm lens at f/4, 1/640s, ISO 200,
> taken from across the site so the background compresses onto the subject.
> Documentary construction photography, real working site, natural available
> light, native grain retained, muted mid-tones, honest neutral whites.
> Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter, chalk
> marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/fabrication-shop.jpg` — Fabrication shop
*Appears on: Sierra Dam Outlet Works, Steel Fabrication and Erection (service).*

> Shop floor of a steel fabricator: a plate girder on trestles, a welder arc
> reflected on the web, sparks falling into a puddle of shop light, gantry
> crane overhead, stacked stock receding into the dark of the shop. Shot on a
> full-frame camera, 50 mm lens at f/2, 1/160s, ISO 800, available light only,
> shallow depth of field falling off behind the subject. Documentary
> construction photography, real working site, natural available light, native
> grain retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty
> hi-vis, greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom
> on the surfaces. Candid imperfect framing, nobody posing for the camera. No
> HDR, no gloss, no lens flare, no text, no logos, no watermark. Aspect ratio
> 3:2.

### `public/assets/img/lib/retrofit-interior.jpg` — Existing structure, stripped back
*Appears on: Civic Center Seismic Retrofit, Digital Engineering (service).*

> Interior strip-out of a 1960s concrete building: an old frame exposed,
> drilled dowels epoxied into the existing beams, a laser scanner on a tripod
> in the middle of the space, plastic sheeting separating the works from a lit
> corridor still in use. Shot on a full-frame camera, 50 mm lens at f/2,
> 1/160s, ISO 800, available light only, shallow depth of field falling off
> behind the subject. Documentary construction photography, real working site,
> natural available light, native grain retained, muted mid-tones, honest
> neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld
> spatter, chalk marks and rust bloom on the surfaces. Candid imperfect
> framing, nobody posing for the camera. No HDR, no gloss, no lens flare, no
> text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/pipe-rack.jpg` — Pipe rack and process columns
*Appears on: El Segundo Hydrotreater Revamp, Oil and Gas Facilities (service), Mechanical and Process (service).*

> A refinery pipe rack and process columns seen from grade: insulated lines,
> valve stations, scaffold on one column, a technician on the walkway in FR
> coveralls with a gas monitor clipped on. Hard flat daylight, no sunset glow.
> Shot on a full-frame camera, 24 mm lens at f/8, 1/500s, ISO 100, overcast
> daylight or an hour before sunset, deep focus front to back. Documentary
> construction photography, real working site, natural available light, native
> grain retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty
> hi-vis, greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom
> on the surfaces. Candid imperfect framing, nobody posing for the camera. No
> HDR, no gloss, no lens flare, no text, no logos, no watermark. Aspect ratio
> 3:2.

### `public/assets/img/lib/tank-shell.jpg` — Storage tank under construction
*Appears on: Carson Tank Farm Rebuild, Oil and Gas Facilities (service).*

> Large steel storage tanks under construction in a terminal: one shell
> part-built with courses stacked and tacked, a completed tank behind,
> containment berm earthworks in the foreground, pipe rack running across the
> frame. Dusty ground, distant flare stack out of focus. Shot on a full-frame
> camera, 24 mm lens at f/8, 1/500s, ISO 100, overcast daylight or an hour
> before sunset, deep focus front to back. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. No HDR, no
> gloss, no lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/weld-habitat-tent.jpg` — Welding under cover
*Appears on: Carson Tank Farm Rebuild, El Segundo Hydrotreater Revamp.*

> Inside a welding habitat tent on a live site: a pipe spool fitted up, purge
> hose taped at the joint, heat blanket on the weld, welder seated on a bucket
> with the hood up waiting on a preheat reading, chalk weld numbers on the
> pipe. Task light, honest deep shadows. Shot on a full-frame camera, 50 mm
> lens at f/2, 1/160s, ISO 800, available light only, shallow depth of field
> falling off behind the subject. Documentary construction photography, real
> working site, natural available light, native grain retained, muted
> mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves,
> muddy boots; weld spatter, chalk marks and rust bloom on the surfaces.
> Candid imperfect framing, nobody posing for the camera. No HDR, no gloss, no
> lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/turnaround-scaffold.jpg` — Process unit in turnaround
*Appears on: El Segundo Hydrotreater Revamp.*

> A refinery process unit during turnaround: scaffolding wrapped around a
> reactor section, crane boom over the unit, crews on the structure in FR
> coveralls, temporary lighting and hoses everywhere, blinds and tags on the
> lines. Overcast, coastal salt haze. Shot on a full-frame camera, 24 mm lens
> at f/8, 1/500s, ISO 100, overcast daylight or an hour before sunset, deep
> focus front to back. Documentary construction photography, real working
> site, natural available light, native grain retained, muted mid-tones,
> honest neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy
> boots; weld spatter, chalk marks and rust bloom on the surfaces. Candid
> imperfect framing, nobody posing for the camera. No HDR, no gloss, no lens
> flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/diver-underwater.jpg` — Diver at work underwater
*Appears on: Beacon Offshore Tieback, Pier J Berth Deepening, Catalina Channel Outfall Repair, Sierra Dam Outlet Works, Underwater and Marine Welding (service).*

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
> on the surfaces. Candid imperfect framing, nobody posing for the camera. No
> HDR, no gloss, no lens flare, no text, no logos, no watermark. Aspect ratio
> 3:2.

### `public/assets/img/lib/dive-spread-deck.jpg` — Dive spread at the surface
*Appears on: Pier J Berth Deepening, Terminal Island Wharf Strengthening, Catalina Channel Outfall Repair, Underwater and Marine Welding (service).*

> Dive station on a barge: tender at the control rack watching gauges,
> umbilical flaked on deck, dive stage on the crane hook, a diver in a hat
> about to step off, a working wharf and a ship behind. Overcast harbour
> light, wet steel deck. Shot on a full-frame camera, 24 mm lens at f/8,
> 1/500s, ISO 100, overcast daylight or an hour before sunset, deep focus
> front to back. Documentary construction photography, real working site,
> natural available light, native grain retained, muted mid-tones, honest
> neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld
> spatter, chalk marks and rust bloom on the surfaces. Candid imperfect
> framing, nobody posing for the camera. No HDR, no gloss, no lens flare, no
> text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/dive-bell-moonpool.jpg` — Saturation bell on the moon pool
*Appears on: Beacon Offshore Tieback.*

> A saturation diving bell suspended over an open moon pool, tenders in hard
> hats guiding it, umbilical bundle, wet steel grating, the water below lit
> from beneath. Industrial interior lighting, breath visible in the cold air.
> Shot on a full-frame camera, 50 mm lens at f/2, 1/160s, ISO 800, available
> light only, shallow depth of field falling off behind the subject.
> Documentary construction photography, real working site, natural available
> light, native grain retained, muted mid-tones, honest neutral whites.
> Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter, chalk
> marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/subsea-clamp.jpg` — Subsea repair clamp
*Appears on: Catalina Channel Outfall Repair.*

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
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/wharf-underdeck.jpg` — Wharf underdeck
*Appears on: Terminal Island Wharf Strengthening.*

> Beneath a wharf deck at low tide: a forest of piles, chloride staining and
> spalled concrete on the pile caps, an inspector in a small boat with a
> headlamp and a clipboard, hard shafts of daylight falling between the beams
> onto the water. Shot on a full-frame camera, 50 mm lens at f/2, 1/160s, ISO
> 800, available light only, shallow depth of field falling off behind the
> subject. Documentary construction photography, real working site, natural
> available light, native grain retained, muted mid-tones, honest neutral
> whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter,
> chalk marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/offshore-platform.jpg` — Fixed offshore platform
*Appears on: Beacon Offshore Tieback.*

> A fixed offshore platform seen from the deck of a dive support vessel:
> jacket legs going down into grey-green water, crane pedestal, helideck edge,
> the vessel own deck spread in the foreground with umbilical reels and
> containers. Gulf swell, overcast, no sunset. Shot on a full-frame camera, 24
> mm lens at f/8, 1/500s, ISO 100, overcast daylight or an hour before sunset,
> deep focus front to back. Documentary construction photography, real working
> site, natural available light, native grain retained, muted mid-tones,
> honest neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy
> boots; weld spatter, chalk marks and rust bloom on the surfaces. Candid
> imperfect framing, nobody posing for the camera. No HDR, no gloss, no lens
> flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/port-wharf-cranes.jpg` — Container berth in service
*Appears on: Pier J Berth Deepening, Terminal Island Wharf Strengthening.*

> A working container berth with construction alongside: ship-to-shore cranes
> loading a vessel down the quay, a crane rail beam being set on the deck
> nearer the camera, fender line and bollards in the foreground. Port haze,
> ordinary daylight. Shot on a full-frame camera, 24 mm lens at f/8, 1/500s,
> ISO 100, overcast daylight or an hour before sunset, deep focus front to
> back. Documentary construction photography, real working site, natural
> available light, native grain retained, muted mid-tones, honest neutral
> whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter,
> chalk marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/bridge-girder-set.jpg` — Girder erection
*Appears on: Santa Ana River Bridge Replacement.*

> Night girder erection over a wide concrete flood channel: two crawler cranes
> at the pick, a steel girder swinging slowly under flood lights, traffic
> control cones and flashing amber on the closed road, crew watching from the
> abutment. Shot on a full-frame camera, 35 mm lens at f/1.8, 1/60s, ISO 3200,
> mixed sodium vapour, LED task light and moonlight, colour temperatures left
> uncorrected. Documentary construction photography, real working site,
> natural available light, native grain retained, muted mid-tones, honest
> neutral whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld
> spatter, chalk marks and rust bloom on the surfaces. Candid imperfect
> framing, nobody posing for the camera. No HDR, no gloss, no lens flare, no
> text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/deck-rebar-falsework.jpg` — Bridge deck and falsework
*Appears on: Santa Ana River Bridge Replacement, Major Civil Engineering (service).*

> Bridge deck rebar tied out over falsework and formwork, a concrete pump boom
> reaching in from the levee road, chalk marks on the soffit forms, crew
> working the far end. Shot low along the deck so the bars converge. Shot on a
> full-frame camera, 24 mm lens at f/8, 1/500s, ISO 100, overcast daylight or
> an hour before sunset, deep focus front to back. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. No HDR, no
> gloss, no lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/dam-cofferdam.jpg` — Dam outlet works
*Appears on: Sierra Dam Outlet Works.*

> A mid-century concrete dam with new outlet works under construction at the
> toe: sheet-pile cofferdam and dewatering pumps at the intake, crane on the
> crest road, workers on staging against the old concrete, algae line marking
> the normal water level, pine slopes either side. Shot on a full-frame
> camera, 24 mm lens at f/8, 1/500s, ISO 100, overcast daylight or an hour
> before sunset, deep focus front to back. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. No HDR, no
> gloss, no lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/channel-earthworks.jpg` — Channel and levee works
*Appears on: Santa Ana River Bridge Replacement, Major Civil Engineering (service).*

> Abutment and channel works seen from a levee road: an excavator trimming a
> slope, formwork panels stacked, a surveyor with a prism pole, a dry concrete
> flood channel running away into haze. Levee gravel in the near foreground
> out of focus. Shot on a full-frame camera, 135 mm lens at f/4, 1/640s, ISO
> 200, taken from across the site so the background compresses onto the
> subject. Documentary construction photography, real working site, natural
> available light, native grain retained, muted mid-tones, honest neutral
> whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter,
> chalk marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/switchyard-lattice.jpg` — Switchyard structures
*Appears on: Imperial Valley Substation.*

> A high-voltage switchyard under construction on desert ground: galvanised
> lattice structures going up, insulator stacks set, bus work overhead, gravel
> yard and chain-link fence, mountains low on the horizon through heat haze.
> Harsh dry light. Shot on a full-frame camera, 24 mm lens at f/8, 1/500s, ISO
> 100, overcast daylight or an hour before sunset, deep focus front to back.
> Documentary construction photography, real working site, natural available
> light, native grain retained, muted mid-tones, honest neutral whites.
> Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter, chalk
> marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/transformer-set.jpg` — Transformer set
*Appears on: Imperial Valley Substation.*

> A large power transformer being lowered onto its foundation by two cranes,
> riggers on tag lines well clear of the load, oil containment pit and pier
> caps visible below, cracked desert ground, energised yard behind. Shot on a
> full-frame camera, 24 mm lens at f/8, 1/500s, ISO 100, overcast daylight or
> an hour before sunset, deep focus front to back. Documentary construction
> photography, real working site, natural available light, native grain
> retained, muted mid-tones, honest neutral whites. Worn-in PPE, dusty hi-vis,
> greasy gloves, muddy boots; weld spatter, chalk marks and rust bloom on the
> surfaces. Candid imperfect framing, nobody posing for the camera. No HDR, no
> gloss, no lens flare, no text, no logos, no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/piling-rig.jpg` — Piling and ground improvement
*Appears on: Carson Tank Farm Rebuild, Imperial Valley Substation, Groundworks and Foundations (service).*

> A piling rig driving a steel pipe pile on a compacted working platform:
> leader mast at full height, hammer at the head, pile cut-offs stacked to one
> side, mud-tracked ground, dust in the air, a banksman watching from a safe
> distance. Shot on a full-frame camera, 24 mm lens at f/8, 1/500s, ISO 100,
> overcast daylight or an hour before sunset, deep focus front to back.
> Documentary construction photography, real working site, natural available
> light, native grain retained, muted mid-tones, honest neutral whites.
> Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter, chalk
> marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/plant-room.jpg` — Plant room
*Appears on: Katella Medical Pavilion, Mechanical and Process (service), Commissioning and Handover (service).*

> Plant room of a large building: chillers and pumps on their plinths, primary
> pipework in identification colours, a fitter on a step ladder gauging a
> valve, cable tray overhead, laser alignment tool on a skid base. Fluorescent
> and daylight mixed. Shot on a full-frame camera, 24 mm lens at f/8, 1/500s,
> ISO 100, overcast daylight or an hour before sunset, deep focus front to
> back. Documentary construction photography, real working site, natural
> available light, native grain retained, muted mid-tones, honest neutral
> whites. Worn-in PPE, dusty hi-vis, greasy gloves, muddy boots; weld spatter,
> chalk marks and rust bloom on the surfaces. Candid imperfect framing, nobody
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

### `public/assets/img/lib/model-review.jpg` — Model review
*Appears on: Digital Engineering (service), Commissioning and Handover (service).*

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
> posing for the camera. No HDR, no gloss, no lens flare, no text, no logos,
> no watermark. Aspect ratio 3:2.

---

## Notes

- Nothing should identify a real company, plant, vessel or person: no readable
  logos, hull names, unit numbers, or a face held in focus as the subject of the
  frame. These need to look like Meridian's own record photography.
- Every prompt asks for ordinary light on purpose. If the generator keeps
  returning sunsets and lens flare, put `overcast, midday, flat light` at the
  front of the prompt and repeat the negative prompt.
- Underwater frames are the hardest to keep honest. Keep `visible backscatter,
  limited visibility, light falloff to black` in — clear blue tropical water
  reads as a holiday photograph, not a repair dive.
- Shooting fewer than 35? Start with the six page images and the heroes of the
  twelve projects. Until a plate exists, the drawing from `npm run artwork`
  stands in for it, and the two can sit side by side without looking broken.
