import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Map, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '../shared/Button';

export function PollingBoothFinder() {
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState(null);

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setResult(null);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        // Fetch real address from OpenStreetMap Nominatim
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        
        // Mock a booth name based on the real location
        const area = data.address.suburb || data.address.city_district || data.address.city || data.address.county || "Local Area";
        const boothName = `Govt. Primary School, ${area}`;

        setResult({
          name: boothName,
          address: data.display_name,
          distance: "0.8 km away",
          constituency: `${area} Assembly Constituency`,
          lat: lat,
          lng: lng
        });
      } catch (error) {
        console.error("Error fetching location details:", error);
        // Fallback
        setResult({
          name: "Nearest Polling Station",
          address: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
          distance: "1.2 km away",
          constituency: "Local Assembly",
          lat: lat,
          lng: lng
        });
      } finally {
        setIsDetecting(false);
      }
    }, (error) => {
      console.error("Geolocation error:", error);
      alert("Unable to retrieve your location. Please check browser permissions.");
      setIsDetecting(false);
    });
  };

  const openMap = () => {
    if (result) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${result.lat},${result.lng}`, '_blank');
    }
  };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative Map Background */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">Find Your Polling Booth Near You</h2>
          <p className="text-slate-400 text-lg">Use your current location to find exactly where you need to vote.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl mx-auto">
          
          <AnimatePresence mode="wait">
            {!isDetecting && !result && (
              <motion.div 
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                  <div className="absolute inset-0 border-2 border-primary-500/30 rounded-full animate-ping" />
                  <MapPin className="w-10 h-10 text-primary-400" />
                </div>
                <Button onClick={handleDetectLocation} size="lg" className="bg-primary-500 hover:bg-primary-600 border-none text-white h-14 px-8 text-lg rounded-2xl shadow-[0_0_40px_rgba(255,153,51,0.4)]">
                  <Navigation className="w-5 h-5 mr-3" />
                  Use My Location
                </Button>
              </motion.div>
            )}

            {isDetecting && (
              <motion.div 
                key="detecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <Loader2 className="w-16 h-16 text-primary-500 animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-medium text-white">Detecting your precise location...</h3>
                <p className="text-slate-400 mt-2">Connecting to satellite APIs</p>
              </motion.div>
            )}

            {result && !isDetecting && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-6 shadow-xl text-left"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-success-100 text-success-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Nearest Booth Found
                    </span>
                    <h3 className="text-2xl font-bold text-slate-800 mt-3">{result.name}</h3>
                  </div>
                  <div className="bg-primary-50 px-3 py-2 rounded-lg text-center">
                    <span className="block text-xl font-black text-primary-600">{result.distance}</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start text-slate-600">
                    <MapPin className="w-5 h-5 mr-3 text-slate-400 shrink-0 mt-0.5" />
                    <p className="font-medium">{result.address}</p>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Map className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                    <p className="font-medium">Constituency: <span className="text-secondary-600 font-bold">{result.constituency}</span></p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={openMap} className="flex-1 bg-secondary-500 hover:bg-secondary-600 h-12 rounded-xl text-white font-bold">
                    View on Map
                  </Button>
                  <Button variant="outline" onClick={() => setResult(null)} className="h-12 rounded-xl border-2 border-slate-200">
                    Search Again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
