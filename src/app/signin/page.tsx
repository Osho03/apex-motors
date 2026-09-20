import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="signin-page">
      <section className="signin-card">
        <Link href="/" className="signin-brand">◆ APEX MOTORS</Link>
        <p className="signin-eyebrow">MEMBER ACCESS</p>
        <h1>Your garage awaits.</h1>
        <p className="signin-copy">Sign in to save your dream fleet, track bespoke enquiries, and receive private allocations.</p>
        <form className="signin-form">
          <label>Email address<input type="email" placeholder="you@example.com" autoComplete="email" required /></label>
          <label>Password<input type="password" placeholder="••••••••" autoComplete="current-password" required /></label>
          <button type="submit">SIGN IN</button>
        </form>
        <p className="signin-note">New to APEX? <Link href="/#vip-concierge">Request member access</Link></p>
      </section>
    </main>
  );
}
