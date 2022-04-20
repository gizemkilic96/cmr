const GOOGLE_API_KEY = 'AIzaSyD2mP_sDlloOcwv6OLmYtATOJIcnDhcZcg';

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  // https://nominatim.openstreetmap.org/reverse?addressdetails=1&format=json&lat=40.186515&lon=29.00307333&zoom=18
  //const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const url = `https://nominatim.openstreetmap.org/reverse?addressdetails=1&format=json&lat=${lat}&lon=${lng}&zoom=18`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  const address = data.display_name;
  console.log(data);
 return address;
}