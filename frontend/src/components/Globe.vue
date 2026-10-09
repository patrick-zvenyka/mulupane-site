<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Globe from 'globe.gl'

const globeContainer = ref(null)
let myGlobe = null

onMounted(() => {
  // Hubs for datalinks
  const hubs = [
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
    { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
    { name: 'Frankfurt', lat: 50.1109, lng: 8.6821 }
  ];

  // Generate arcs connecting hubs
  const arcsData = [];
  hubs.forEach(start => {
    hubs.forEach(end => {
      if (start.name !== end.name) {
        // Only create some random connections to avoid clutter
        if (Math.random() > 0.4) {
          arcsData.push({
            startLat: start.lat,
            startLng: start.lng,
            endLat: end.lat,
            endLng: end.lng,
            color: ['#2563eb', '#60a5fa', '#93c5fd'][Math.round(Math.random() * 2)]
          });
        }
      }
    });
  });

  // Generate ring markers at hubs
  const ringsData = hubs.map(hub => ({
    lat: hub.lat,
    lng: hub.lng,
    maxR: 3 + Math.random() * 3,
    propagationSpeed: 1 + Math.random(),
    repeatPeriod: 700 + Math.random() * 800
  }));

  myGlobe = Globe()(globeContainer.value)
    .backgroundColor('rgba(0,0,0,0)')
    .showAtmosphere(true)
    .atmosphereColor('#3b82f6')
    .atmosphereAltitude(0.15)
    
    // Configure Rings (Nodes)
    .ringsData(ringsData)
    .ringColor(() => '#2563eb')
    .ringMaxRadius('maxR')
    .ringPropagationSpeed('propagationSpeed')
    .ringRepeatPeriod('repeatPeriod')

    // Configure Arcs (Datalinks)
    .arcsData(arcsData)
    .arcColor('color')
    .arcDashLength(0.4)
    .arcDashGap(0.2)
    .arcDashInitialGap(() => Math.random() * 5)
    .arcDashAnimateTime(1500)
    .arcStroke(0.7)
    .arcAltitudeAutoScale(0.3)

  // Configure map polygons (Landmass)
  fetch('//unpkg.com/three-globe/example/dataset/custom.geo.json')
    .then(res => res.json())
    .then(countries => {
      myGlobe.hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonColor(() => '#cbd5e1') // slate-300
    })

  // Style the globe material to match light theme
  const globeMaterial = myGlobe.globeMaterial();
  globeMaterial.color.set('#f8fafc'); // slate-50
  globeMaterial.emissive.set('#ffffff');
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.transparent = true;
  globeMaterial.opacity = 0.95;

  // Auto-rotate and sizing
  myGlobe.controls().autoRotate = true;
  myGlobe.controls().autoRotateSpeed = 0.8;
  myGlobe.controls().enableZoom = false; // Disable zooming for background
  
  // Responsive sizing
  const handleResize = () => {
    const width = globeContainer.value.clientWidth;
    const height = globeContainer.value.clientHeight;
    myGlobe.width(width).height(height);
  };
  
  window.addEventListener('resize', handleResize);
  // Initial size
  setTimeout(handleResize, 100);
})

onBeforeUnmount(() => {
  if (myGlobe) {
    // Cleanup if needed
  }
})
</script>

<template>
  <div class="w-full h-full flex justify-center items-center opacity-70 mix-blend-multiply scale-125 pointer-events-none">
    <!-- Container for globe.gl -->
    <div ref="globeContainer" class="w-[800px] h-[800px] max-w-full max-h-full aspect-square"></div>
  </div>
</template>
