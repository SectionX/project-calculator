# project-calculator
The Odin Project assignment.

Version History:

v1.0

- Added evaluation function
- Added operation precedence
- Fixed the space bug


v0.4

- Added classes and ids to HTML Elements.
- Added event handlers for button clicks and keyboard presses.
- Added text formatting and restricted commas on numbers that already have one.


Future plans:

- GUI overhaul
- Support for trigonometric operations and pi

Notes: 

- The calculator is functional, although it has a few bugs and
  I haven't tested it thoroughly to make sure that the results are always
  correct. For the + - * / () operations it should work fine. The root and power
  operations were a bit harder to implement. This is due to exponents working
  from right to left. Example: 2^3^2 = 2^9, not 8^2. However I still haven't
  found any errors, at least in powers. 
  
  Additionally I wanted to implement the root in a robust way. The user can 
  choose any root he wants by typing x√n. I also implemented the square root 
  in a shorthand way, by typing √n. 

  Parenthesis are implemented recursively. I want to do the same for powers too
  but unless I change the parser to not use regex, I won't bother, as long as
  the calculator doesn't do calculation errors in it's current state.

  I limited floats to 4 decimals.

Known bugs:

- Pressing space adds a whitespace when it should be ignored. I can't understand
  why this is happening and restricting the event listener doesn't seem to work.
  It's not a terrible bug, but it can potentially break the calculations.

Other issues:

- I implemented the parser with Regex. While it was a good practice and it works, 
  I don't consider it a good idea. Perhaps in the future I'll change it to a
  more barebones algorithm that doesn't have any dependencies. Parsers are really
  annoying to make.
