# Pitch
P1TCH is a game to test your sight reading skills.
A music note will be displayed in the treble cleff of a music staff and you must play the corresponding note in your instrument.

## How does it work?
The code checks the loudest frequency being captured in your microphone and checks if it is the same note as the one displayed in your screen. Once every new note a function that does this check is called and if the user got the right note, he is awarded a point and a sound is played.
The group of added soud waves is decomposed using FFT (Fast Fourier Transfom) and the volume of each frequency is checked to verify which one is the loudest. I was having some problems with harmonics, so the program would sometime consider the harmonics (especially the octaves) as being louder than the fundamental, but this issue has been fixed by multiplying the expected frequency by integers (so we also check for higher octaves) and dividing it by integers as well (so we also check for lower octaves).

## How to run it
This program was developed in P5.js, a JavaScript library. You can use their web editor and paste-in the assets in this repository (including the files for the sounds and images). Another option is to click the link https://preview.p5js.org/TatuTenente/present/L9RqqKZHH to run it.
You can also embed it to your own website by downloading the files in this repo and adding it to you website's files.
