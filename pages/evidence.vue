<template>
  <div>
    <label for="police-station">
      Select Police Station
      <select id="police-station">
        <option>Select nearby police station</option>
        <option>Kyaggwe Police Station</option>
        <option>Mukono Police Station</option>
        <option>Seeta Police Station</option>
      </select>
    </label>


    <label for="crime-location">
      Detect Location
    </label>
    <input type="text" placeholder="Tap to get my location" readonly>
    <button>Get Location</button>


    <div class="file-section">
      <label for="file-type">
        Select File Type
      </label>
      <select id="file-type">
        <option value="">Choose type</option>
        <option value="images/jpeg">Images (JPEG)</option>
        <option value="videos/mp4">Videos (MP4)</option>
        <option value="other">Other</option>
      </select>

      <label for="evidence-upload">
        Attach Evidence
      </label>
      <input type="file" multiple>
      <small>Acceptable formats: videos, images, or documents</small>
    </div>

    <button type="submit">Submit</button>


  </div>
</template>
