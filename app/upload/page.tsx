import Link from "next/link";
import { scenarios } from "@/data/scenarios";

export default function UploadPage() {
  return (
    <main>
      {/* Stepper Indicator */}
      <div data-testid="stepper">
        <span>Step 1 of 3: Upload</span>
        <span>Process</span>
        <span>Compare</span>
      </div>

      {/* Upload Drop Zone */}
      <section data-testid="upload-dropzone">
        <h2>Upload a product image</h2>
        <p>JPG or PNG, Max 10 MB</p>
        <button>Choose File</button>
      </section>

      {/* Disclaimer Box */}
      <section data-testid="disclaimer-box">
        <p>
          <strong>Demo Mode:</strong> Our AI-powered image recognition is still under development. 
          To preview how Pink Tax Checker works, please select one of the sample products below 
          instead of uploading your own photo.
        </p>
      </section>

      {/* Scenario Selector */}
      <section>
        <h2>Select a Sample Product</h2>
        <div>
          {scenarios.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/compare?scenario=${scenario.id}`}
              data-testid={`scenario-${scenario.id}`}
            >
              <div>
                <p>{scenario.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
