## fs-matrix-header

Web component for the Flight Search Rime range Row. Is displayed when the user has specified a preferred time.

## Properties
- `departureTimeMatch` : `boolean`
    - departureTimeMatch is a boolean that communicates if the flight that is being looped through matches the departure time the user specified
- `previousTimeMatch` : `boolean`
    - previousTimeMatch is a boolean that communicates if the previous flight matched the departure time the user specified
- `flight` : `number`
    - flight is an integer that represents the current flight index being looped through. This is used because the "Preferred Flights" message should only be displayed once at the top 

## Examples

- ```
    <fs-time-range-row departureTimeMatch flight=1 ></fs-time-range-row>
- ```
   <fs-time-range-row flight=1 ></fs-time-range-row>
- ```
  <fs-time-range-row previousTimeMatch flight=0 ></fs-time-range-row>
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
  - Showing "Preferred times"
  - Showing "Preferred times are unavailable"
  - Showing "Additional times"
- Code Coverage: **100%**

## Refinement opportunities
  - Opportunity to redesign the look and feel of this component. The team changed the font and color, however, room to improve on the overall design.
