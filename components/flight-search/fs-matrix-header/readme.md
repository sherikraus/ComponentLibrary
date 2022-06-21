## fs-matrix-header

Web component for the Flight Search Matrix Header. 

## Properties
- `matrixLabel` : `String`
    - matrixLabel is a string that expects "flight", "returning flight", or "departing flight" to display above the itineraries. The WC will lowercase the whole string to fit inside "Choose `matrixLabel` : "
- `displayTrips` : `Array`
    - displayTrips is an Array of strings with the itinerary/itineraries to display underneath the MatrixLabel. In efforts to keep the same functionality between existing code and new Web Components, this property is an Array due to the original data structure. Please see the demo or examples section on how to populate this field.

## Examples

- ```
    <fs-matrix-header
     matrixLabel="Departing flight"
     displayTrips='["Walla Walla (ALW) to Seattle (SEA)"]'>
     </fs-matrix-header>
    ```
- ```
   <fs-matrix-header  
    matrixLabel="returning flight" 
    displayTrips='["Seattle (SEA) to Walla Walla (ALW)"]'>
   </fs-matrix-header>
   ```
- ```
  <fs-matrix-header  
   matrixLabel="returning flight"
   displayTrips='["Walla Walla (ALW) to Seattle (SEA)", "Seattle (SEA) to Walla Walla (ALW)"]'>
   </fs-matrix-header>
   ```

 
## Demo
- [fs-matrix-header](https://componentlibrary-prod-aks.westus2.cloudapp.azure.com/demo/fs-matrix-header)


## Tech/framework used

<b>Built with</b>
- [LitElement](https://lit-element.polymer-project.org/)
- [P2P Component Library](https://componentlibrary-prod-aks.westus2.cloudapp.azure.com/)


## Tests
- Please see the `tests` folder. All components are tested using Karma
- This component tests:
  - If accessible
  - If accessible in IE
  - Showing custom choose header message
  - Showing custom itinerary message
- Code Coverage: **100%**

## Refinement opportunities
-  ### Properties
   -  `displayTrips` property is only an Array due to legacy code using a list for that data structure. It is unknown however if that List is ever bigger than size = 1. If it is only ever 1 then there is an opportunity to make it a string and simplify this component
