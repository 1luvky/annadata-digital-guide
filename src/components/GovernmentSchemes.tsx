
import React, { useState } from 'react';
import { FileText, ArrowLeft, ExternalLink, CheckCircle, Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Scheme {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  applicationProcess: string[];
  deadline?: string;
  contactInfo: string;
  websiteUrl: string;
  budget: string;
}

const GovernmentSchemes = ({ onBack }: { onBack: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const schemes: Scheme[] = [
    {
      id: '1',
      name: 'PM-KISAN Samman Nidhi',
      category: 'Financial Support',
      description: 'Direct income support to farmers providing ₹6000 per year in three installments',
      benefits: [
        '₹6000 per year direct cash transfer',
        'Paid in 3 installments of ₹2000 each',
        'Direct bank transfer every 4 months'
      ],
      eligibility: [
        'All landholding farmers',
        'Must have Aadhaar card',
        'Valid bank account',
        'Land ownership documents'
      ],
      documents: [
        'Aadhaar Card',
        'Bank Account Details',
        'Land Records (Khata/Pahani)',
        'Mobile Number'
      ],
      applicationProcess: [
        'Visit pmkisan.gov.in',
        'Click on "New Farmer Registration"',
        'Fill personal and bank details',
        'Upload required documents',
        'Submit application'
      ],
      contactInfo: 'Helpline: 155261, Email: pmkisan-ict@gov.in',
      websiteUrl: 'https://pmkisan.gov.in',
      budget: '₹75,000 Crores annually'
    },
    {
      id: '2',
      name: 'Pradhan Mantri Fasal Bima Yojana',
      category: 'Insurance',
      description: 'Crop insurance scheme providing financial support to farmers in case of crop loss',
      benefits: [
        'Premium subsidy up to 90%',
        'Coverage for all stages of crop cycle',
        'Quick claim settlement',
        'Use of technology for damage assessment'
      ],
      eligibility: [
        'All farmers growing notified crops',
        'Sharecroppers and tenant farmers eligible',
        'Must be enrolled before sowing'
      ],
      documents: [
        'Aadhaar Card',
        'Bank Account Details',
        'Land Records',
        'Sowing Certificate',
        'Previous season harvest details'
      ],
      applicationProcess: [
        'Contact nearest CSC or bank',
        'Fill application form',
        'Pay farmer share of premium',
        'Receive policy document',
        'Report crop loss within 72 hours'
      ],
      deadline: 'Before sowing season',
      contactInfo: 'Toll-free: 14447',
      websiteUrl: 'https://pmfby.gov.in',
      budget: '₹15,695 Crores'
    },
    {
      id: '3',
      name: 'Kisan Credit Card (KCC)',
      category: 'Credit',
      description: 'Credit facility for farmers to meet their cultivation and allied activities',
      benefits: [
        'Flexible credit limit based on land holding',
        'Low interest rates (7% for timely repayment)',
        '3% interest subvention',
        'Personal accident insurance coverage'
      ],
      eligibility: [
        'All farmers with cultivable land',
        'Tenant farmers with valid documents',
        'Self Help Group members',
        'Joint liability groups'
      ],
      documents: [
        'Application form',
        'Identity proof',
        'Address proof',
        'Land documents',
        'Income proof'
      ],
      applicationProcess: [
        'Visit nearest bank branch',
        'Fill KCC application form',
        'Submit required documents',
        'Bank verification process',
        'Card issuance after approval'
      ],
      contactInfo: 'Contact nearest bank branch',
      websiteUrl: 'https://www.nabard.org',
      budget: '₹2 Lakh Crores target'
    },
    {
      id: '4',
      name: 'PM Kisan Maandhan Yojana',
      category: 'Pension',
      description: 'Pension scheme for small and marginal farmers providing monthly pension after 60 years',
      benefits: [
        '₹3000 monthly pension after 60',
        'Contribution matched by government',
        'Family pension for spouse',
        'Voluntary exit with interest'
      ],
      eligibility: [
        'Small and marginal farmers (up to 2 hectares)',
        'Age between 18-40 years',
        'Not covered under EPFO/ESIC/NPS',
        'Not an income tax payer'
      ],
      documents: [
        'Aadhaar Card',
        'Bank Account (same as PM-KISAN)',
        'Land records showing ownership',
        'Age proof'
      ],
      applicationProcess: [
        'Visit CSC or enroll online',
        'Provide Aadhaar and bank details',
        'Pay first contribution',
        'Receive acknowledgment',
        'Continue monthly contributions'
      ],
      contactInfo: 'Helpline: 14434',
      websiteUrl: 'https://maandhan.in',
      budget: '₹900 Crores for 3 years'
    }
  ];

  const categories = ['all', 'Financial Support', 'Insurance', 'Credit', 'Pension', 'Subsidy'];

  const filteredSchemes = selectedCategory === 'all' 
    ? schemes 
    : schemes.filter(scheme => scheme.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-600 to-earth-600 text-white py-4 px-4">
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
            <h1 className="text-xl font-bold">Government Schemes</h1>
            <p className="text-forest-100 text-sm">Find subsidies & support programs</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Category Filter */}
        <Card className="scheme-card p-4 mb-4">
          <h3 className="font-semibold text-earth-800 mb-3">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`text-xs ${
                  selectedCategory === category
                    ? 'bg-forest-600 hover:bg-forest-700'
                    : 'border-forest-200 text-forest-700 hover:bg-forest-50'
                }`}
              >
                {category === 'all' ? 'All Schemes' : category}
              </Button>
            ))}
          </div>
        </Card>

        {/* Schemes List */}
        <div className="space-y-4">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="scheme-card p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <FileText className="h-5 w-5 text-earth-600 mr-2" />
                    <h3 className="font-semibold text-earth-800 text-lg">
                      {scheme.name}
                    </h3>
                  </div>
                  <span className="inline-block px-2 py-1 bg-earth-100 text-earth-700 text-xs rounded-full">
                    {scheme.category}
                  </span>
                </div>
              </div>

              <p className="text-earth-700 text-sm mb-3">{scheme.description}</p>

              {/* Key Benefits Preview */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                <h4 className="font-semibold text-green-800 text-sm mb-2">Key Benefits</h4>
                <ul className="space-y-1">
                  {scheme.benefits.slice(0, 2).map((benefit, index) => (
                    <li key={index} className="text-sm text-green-700 flex items-start">
                      <CheckCircle className="h-3 w-3 mt-1 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpandedScheme(
                    expandedScheme === scheme.id ? null : scheme.id
                  )}
                  className="flex-1 border-earth-200 text-earth-700"
                >
                  {expandedScheme === scheme.id ? 'Show Less' : 'View Details'}
                </Button>
                <Button
                  size="sm"
                  className="bg-earth-600 hover:bg-earth-700 text-white"
                  onClick={() => window.open(scheme.websiteUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Apply
                </Button>
              </div>

              {/* Expanded Details */}
              {expandedScheme === scheme.id && (
                <div className="mt-4 space-y-4 border-t border-earth-200 pt-4">
                  {/* Eligibility */}
                  <div>
                    <h4 className="font-semibold text-earth-800 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Eligibility Criteria
                    </h4>
                    <ul className="space-y-1">
                      {scheme.eligibility.map((criteria, index) => (
                        <li key={index} className="text-sm text-earth-700 flex items-start">
                          <span className="w-2 h-2 bg-earth-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h4 className="font-semibold text-earth-800 mb-2">Required Documents</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {scheme.documents.map((doc, index) => (
                        <div key={index} className="bg-white border border-earth-200 rounded p-2">
                          <span className="text-sm text-earth-700">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Process */}
                  <div>
                    <h4 className="font-semibold text-earth-800 mb-2">How to Apply</h4>
                    <ol className="space-y-1">
                      {scheme.applicationProcess.map((step, index) => (
                        <li key={index} className="text-sm text-earth-700 flex items-start">
                          <span className="font-bold mr-2 text-earth-600">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="space-y-2 text-sm">
                      {scheme.deadline && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-blue-800">
                            <strong>Deadline:</strong> {scheme.deadline}
                          </span>
                        </div>
                      )}
                      <div className="text-blue-700">
                        <strong>Contact:</strong> {scheme.contactInfo}
                      </div>
                      <div className="text-blue-700">
                        <strong>Budget Allocation:</strong> {scheme.budget}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-6 p-4 bg-yellow-50 border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">Need Help?</h3>
          <p className="text-sm text-yellow-700 mb-3">
            Contact your local agriculture extension officer or visit the nearest CSC (Common Service Center) for assistance with applications.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="border-yellow-300 text-yellow-800 hover:bg-yellow-100"
          >
            Find Nearest CSC
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
