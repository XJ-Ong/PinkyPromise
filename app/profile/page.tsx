import { mockProfile } from "@/data/profile";
import { deals } from "@/data/deals";

export default function ProfilePage() {
  // Get first 2 deals as "my reports" for demo
  const myReports = deals.slice(0, 2);

  return (
    <main>
      {/* Profile Header */}
      <section data-testid="profile-header">
        <div data-testid="avatar">
          <p>Avatar</p>
        </div>
        <h1>{mockProfile.name}</h1>
        <p>Member since {mockProfile.memberSince}</p>
      </section>

      {/* Stats */}
      <section data-testid="profile-stats">
        <div>
          <p>{mockProfile.productsChecked}</p>
          <p>Products Checked</p>
        </div>
        <div>
          <p>{mockProfile.reportsSubmitted}</p>
          <p>Reports Submitted</p>
        </div>
        <div>
          <p>RM {mockProfile.totalSavedRM.toFixed(2)}</p>
          <p>Total Saved</p>
        </div>
      </section>

      {/* My Reports */}
      <section>
        <h2>My Reports</h2>
        <div>
          {myReports.map((deal) => (
            <article key={deal.id} data-testid={`my-report-${deal.id}`}>
              <h3>{deal.productName}</h3>
              <p>{deal.category}</p>
              <p>RM {deal.price.toFixed(2)}</p>
              <p>Save {deal.discountPercent}%</p>
              {deal.verified && <span>Verified</span>}
            </article>
          ))}
        </div>
      </section>

      {/* Settings */}
      <section data-testid="settings">
        <button>Settings</button>
      </section>
    </main>
  );
}
