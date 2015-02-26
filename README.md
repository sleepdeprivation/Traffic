# Traffic
A (very simple) traffic simulator


We have an entry point in index.html.

From there we have some classes:
  Car - Originally intended to be autonomous. These things just get pushed around now by the whole system.
  
  Street- Holds a finite list of cars
  
  Intersection -  the junctions between the streets. There should be management functions
                  but they're stuck in Traffic.js right now
                  
  Traffic - Controller for the whole thing
  
  Source - placeholder, in the future I'd imagined it would spawn/eat cars as they went to and from their destinations
  
As I've said above, the cars were supposed to be autonomous. The blinkers were supposed to signal to the greater
system what they wanted to do, and the system would try it's best to make it happen.
As it stands now we have the central Traffic.js controlling everything. Even worse, functionality that should have
been packed into other classes like Intersection is sitting in Traffic.js (unintentional pun).
It can still be fixed though. The reason for this state of affairs is that I began development with way fewer files
(think /one/ file) and when I broke it up some things got the short end.
