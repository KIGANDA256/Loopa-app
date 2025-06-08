<!-- eslint-disable vue/no-multiple-template-root -->
<!-- eslint-disable vue/attributes-order -->

<template>

  <navBar />
  <div class="flex flex-col mx-20 my-20 h-200 border-2 border-gray-300 rounded-lg px-50 py-16 shadow-lg bg-white ">
    <label for="police-station" class="text-lg font-bold text-gray-700">
      Select Police Station
      <select class="block w-full mt-2 p-2 border border-gray-300 rounded" id="police-station">
        <option value="" disabled selected>Select a police station</option>
        <option>Select nearby police station</option>
        <option>Kyaggwe Police Station</option>
        <option>Mukono Police Station</option>
        <option>Seeta Police Station</option>
      </select>
    </label>


    <label for="crime-location" class="text-lg font-bold text-gray-700 mt-4">
      Detect Location
    </label>
    <input type="text" placeholder="Tap to get my location" readonly
      class="block w-full mt-2 p-2 border border-gray-300 rounded" id="crime-location">

    <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded" id="get-location">
      <small>Click the button to get your location</small>
    </button>


    <div class="mt-4">
      <label class="text-lg text-3xl text-gray-700" for="crime-type">
        Select File Type
      </label>
      <select class="block w-full mt-2 p-2 border border-gray-300 rounded" id="crime-type">
        <option value="" disabled selected>Select a file type</option>
        <option value="documents/pdf">Documents (PDF)</option>
        <option value="images/jpeg">Images (JPEG)</option>
        <option value="videos/mp4">Videos (MP4)</option>
        <option value="other">Other</option>
      </select>

      <label for="evidence-upload">
        Attach Evidence
      </label>
      <input type="file" multiple class="block w-full mt-2 p-2 border border-gray-300 rounded" id="evidence-upload"
        accept=".pdf, .jpg, .jpeg, .mp4">
      <small>Acceptable formats: videos, images, or documents</small>
    </div>

    <button type="submit" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>


  </div>
</template>
