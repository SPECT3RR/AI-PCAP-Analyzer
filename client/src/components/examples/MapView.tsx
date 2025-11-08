import MapView from "../MapView";

export default function MapViewExample() {
  const mockMarkers = [
    { ip: "192.168.1.100", country: "United States", lat: 37.7749, lon: -122.4194, threatScore: 75 },
    { ip: "10.0.0.45", country: "Russia", lat: 55.7558, lon: 37.6173, threatScore: 85 },
    { ip: "172.16.0.23", country: "China", lat: 39.9042, lon: 116.4074, threatScore: 45 },
    { ip: "192.168.2.50", country: "Germany", lat: 52.5200, lon: 13.4050, threatScore: 15 },
    { ip: "10.1.1.100", country: "Japan", lat: 35.6762, lon: 139.6503, threatScore: 20 },
  ];

  return (
    <div className="p-8 bg-background">
      <MapView markers={mockMarkers} />
    </div>
  );
}
