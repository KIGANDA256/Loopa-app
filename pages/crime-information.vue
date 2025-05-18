<!-- <title>Crime Interference Form</title> -->

<template>
  <div class="form-container">
    <h2>Crime Interference Report</h2>
    <label for="crime-date">
      Date of Crime
      <input type="date" placeholder="DD/MM/YYYY">
    </label>

    <label for="crime-time">
      Time of Crime
      <input type="time">
    </label>

    <label for="crime-location">
      Location of Crime
      <select id="crime-location">
        <option>Select Location</option>
        <option>City Centre</option>
        <option>Town</option>
      </select>
    </label>

    <!-- <label for="crime-description">
    Description of Crime
    <textarea
      id="crime-description"
      rows="4"
      placeholder="Describe">
    </textarea>
  </label>
 -->
    <label for="injury-type">
      Any Injuries
      <select id="injury-type">
        <option>Select type of injury</option>
        <option>None</option>
        <option>Severe</option>
        <option>Minor</option>
      </select>
    </label>

    <button>Proceed</button>
  </div>
</template>
<style lang="css" scoped></style>