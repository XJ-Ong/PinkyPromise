import Link from "next/link";

export default function ReportPage({
  searchParams,
}: {
  searchParams: { context?: string };
}) {
  const context = searchParams.context;

  return (
    <main>
      {/* Back Arrow */}
      <Link href={context ? `/compare?scenario=${context}` : "/"} data-testid="back-button">
        Back
      </Link>

      {/* Form */}
      <section>
        <h1>Report a Better Price</h1>
        <form data-testid="report-form">
          <div>
            <label htmlFor="productName">Product/Alternative Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              required
              data-testid="product-name-input"
            />
          </div>

          <div>
            <label htmlFor="storeName">Store Name</label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              required
              data-testid="store-name-input"
            />
          </div>

          <div>
            <label htmlFor="price">Price (RM)</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              required
              data-testid="price-input"
            />
          </div>

          <div>
            <label htmlFor="photo">Photo (optional)</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              disabled
              data-testid="photo-upload"
            />
          </div>

          <div>
            <label htmlFor="note">Note (optional)</label>
            <textarea
              id="note"
              name="note"
              data-testid="note-input"
            />
          </div>

          <button type="submit" data-testid="submit-report">
            Submit Report
          </button>
        </form>
      </section>
    </main>
  );
}
