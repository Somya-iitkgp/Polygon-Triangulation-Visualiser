# Polygon-Triangulation-Visualiser
Polygon Triangulation Visualizer Based on Ear Clipping Algorithm built using Javascript

### Ear Clipping Algorithm:
In this method we approach problem by finding Ears in the polygon which are 
the coordinates combined with previous and next coordinate that form a valid triangle
which could be removed without disturbing other points which thus forms a new polygon with one vertex less
and simaltaneously Ears are found of thr new polygon and similarly the coordinates and Ear are
removed recursively until only 3 coordinates are left.

### Time Complexity:
It takes O(n) time in storing the coordinates in form of an object and finding ears
It takes O(n^2) time {O(n) time in checking for every coordinate and another O(n) time for 
checking if a triangle formed contains any other coordinate}
After which transversing and deleting coordinates takes O(n^2){O(n) time for iterating through Elements of Ear,
O(1) time for deletion as we are always deleting head only, O(n) time for checking for new Ear at prev and next position}
So Overall Time Complexity of algorithm is = O(n^2) 
