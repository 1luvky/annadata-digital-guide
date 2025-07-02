
import React, { useState, useRef } from 'react';
import { Camera, Upload, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CropDiagnosis = ({ onBack }: { onBack: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setDiagnosis({
        disease: 'Tomato Late Blight',
        confidence: '92%',
        severity: 'Moderate',
        cause: 'Fungal infection caused by Phytophthora infestans',
        symptoms: [
          'Dark brown spots on leaves',
          'White fuzzy growth on leaf undersides',
          'Rapid spreading in humid conditions'
        ],
        treatment: [
          'Apply copper-based fungicide immediately',
          'Remove affected leaves and destroy them',
          'Improve air circulation around plants',
          'Avoid overhead watering'
        ],
        prevention: [
          'Plant resistant varieties',
          'Ensure proper spacing between plants',
          'Apply preventive fungicide sprays'
        ],
        cost: '₹150-200 per acre for treatment'
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-600 to-forest-700 text-white py-4 px-4">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-3 text-white hover:bg-forest-700"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Crop Doctor</h1>
            <p className="text-forest-100 text-sm">AI-powered disease diagnosis</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {!selectedImage ? (
          // Image capture section
          <div className="space-y-4">
            <Card className="farmer-card p-6 text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 text-forest-600" />
              <h2 className="text-lg font-semibold text-forest-800 mb-2">
                Capture Plant Image
              </h2>
              <p className="text-forest-600 text-sm mb-4">
                Take a clear photo of the affected plant leaves or crop area
              </p>
              
              <div className="space-y-3">
                <Button
                  className="action-button w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-forest-200 text-forest-700"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload from Gallery
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                className="hidden"
              />
            </Card>

            {/* Tips */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Photography Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Focus on affected areas</li>
                <li>• Include healthy parts for comparison</li>
                <li>• Take multiple angles if needed</li>
              </ul>
            </Card>
          </div>
        ) : (
          // Analysis section
          <div className="space-y-4">
            <Card className="farmer-card p-4">
              <img
                src={selectedImage}
                alt="Captured crop"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              {!diagnosis && !isAnalyzing && (
                <div className="space-y-3">
                  <Button
                    className="action-button w-full"
                    onClick={analyzeCrop}
                  >
                    Analyze Crop
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-forest-200 text-forest-700"
                    onClick={() => setSelectedImage(null)}
                  >
                    Take Another Photo
                  </Button>
                </div>
              )}
            </Card>

            {isAnalyzing && (
              <Card className="p-6 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-forest-600" />
                <h3 className="font-semibold text-forest-800 mb-2">
                  Analyzing Your Crop...
                </h3>
                <p className="text-forest-600 text-sm">
                  Our AI is examining the image for diseases and pests
                </p>
              </Card>
            )}

            {diagnosis && (
              <div className="space-y-4">
                {/* Diagnosis Result */}
                <Card className="farmer-card p-4">
                  <div className="flex items-start space-x-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-forest-800 text-lg">
                        {diagnosis.disease}
                      </h3>
                      <p className="text-forest-600 text-sm">
                        Confidence: {diagnosis.confidence} | Severity: {diagnosis.severity}
                      </p>
                    </div>
                  </div>
                  <p className="text-forest-700 text-sm">{diagnosis.cause}</p>
                </Card>

                {/* Symptoms */}
                <Card className="p-4">
                  <h4 className="font-semibold text-forest-800 mb-2">Symptoms</h4>
                  <ul className="space-y-1">
                    {diagnosis.symptoms.map((symptom: string, index: number) => (
                      <li key={index} className="text-sm text-forest-700 flex items-start">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Treatment */}
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-800">Treatment Plan</h4>
                  </div>
                  <ul className="space-y-1">
                    {diagnosis.treatment.map((step: string, index: number) => (
                      <li key={index} className="text-sm text-green-700 flex items-start">
                        <span className="font-bold mr-2">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 p-2 bg-green-100 rounded">
                    <p className="text-sm text-green-800">
                      <strong>Estimated Cost:</strong> {diagnosis.cost}
                    </p>
                  </div>
                </Card>

                {/* Prevention */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Prevention Tips</h4>
                  <ul className="space-y-1">
                    {diagnosis.prevention.map((tip: string, index: number) => (
                      <li key={index} className="text-sm text-blue-700 flex items-start">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Button
                  variant="outline"
                  className="w-full border-forest-200 text-forest-700"
                  onClick={() => {
                    setSelectedImage(null);
                    setDiagnosis(null);
                  }}
                >
                  Diagnose Another Crop
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDiagnosis;
