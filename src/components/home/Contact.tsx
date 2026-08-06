import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
	const formRef = useRef<HTMLFormElement>(null);
	const [status, setStatus] = useState("Replies within a day.");

	const sendMail = (e: React.FormEvent) => {
		e.preventDefault();
		const form = formRef.current;
		if (!form) return;

		setStatus("Sending…");
		emailjs
			.sendForm("service_j3sbexk", "template_9t82q8s", form, "qFOlVk_wG5pnyDf0m")
			.then(() => {
				setStatus("Message sent, thanks. I\u2019ll reply soon.");
				form.reset();
			})
			.catch(() => {
				setStatus("Something went wrong. Mail me directly instead.");
			});
	};

	return (
		<section
			id="contact"
			style={{
				background: "linear-gradient(180deg,#12131f 0%,#22265a 100%)",
				position: "relative",
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: "calc(var(--space-8) * 2)",
				padding: "calc(var(--space-8) * 4) clamp(20px,5vw,72px)",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					left: "50%",
					bottom: "-30%",
					width: "min(1200px,130vw)",
					aspectRatio: "1",
					transform: "translateX(-50%)",
					borderRadius: "50%",
					background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, transparent 64%)",
					filter: "blur(30px)",
					pointerEvents: "none",
				}}
			/>

			<div style={{ position: "relative", overflow: "hidden" }}>
				<h2
					data-mask
					className="section-title-lg"
					style={{
						margin: 0,
						fontFamily: "var(--font-heading)",
						fontWeight: 500,
						fontSize: "17.2vw",
						lineHeight: 0.84,
						letterSpacing: "-0.04em",
						whiteSpace: "nowrap",
					}}
				>
					LET&apos;S TALK
				</h2>
			</div>

			<div
				className="contact-grid"
				style={{
					position: "relative",
					display: "grid",
					gridTemplateColumns: "minmax(0,1fr) minmax(0,0.95fr)",
					gap: "clamp(32px,5vw,90px)",
					alignItems: "start",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: "calc(var(--space-8) * 1.4)" }}>
					<p
						data-reveal
						style={{
							margin: 0,
							fontSize: "clamp(16px,1.35vw,20px)",
							lineHeight: 1.6,
							maxWidth: "38ch",
							color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
						}}
					>
						Hiring a front-end developer, or need a second pair of hands on a build? Write me, I answer fast.
					</p>
					<a
						data-reveal
						data-magnetic
						href="mailto:matteo.giambarresi0504@gmail.com"
						style={{
							display: "inline-block",
							fontFamily: "var(--font-heading)",
							fontWeight: 500,
							fontSize: "clamp(17px,1.9vw,30px)",
							letterSpacing: "-0.02em",
							color: "var(--color-text)",
							paddingBottom: 8,
							background: "linear-gradient(to right, var(--color-accent), var(--color-accent)) no-repeat bottom / 100% 1px",
							wordBreak: "break-word",
						}}
					>
						matteo.giambarresi0504@gmail.com
					</a>
					<div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)" }}>
						<a
							className="btn btn-secondary"
							data-magnetic
							href="https://www.linkedin.com/in/matteo-giambarresi-926458298/"
							target="_blank"
							rel="noopener"
							style={{ fontSize: 13, padding: "var(--space-4) var(--space-6)", minHeight: 44, color: "var(--color-text)" }}
						>
							LinkedIn
						</a>
						<a
							className="btn btn-secondary"
							data-magnetic
							href="https://github.com/Matgiam"
							target="_blank"
							rel="noopener"
							style={{ fontSize: 13, padding: "var(--space-4) var(--space-6)", minHeight: 44, color: "var(--color-text)" }}
						>
							GitHub
						</a>
					</div>
				</div>

				<form
					ref={formRef}
					data-reveal
					onSubmit={sendMail}
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--space-6)",
						padding: "calc(var(--space-8) * 1.2)",
						borderRadius: "var(--radius-lg)",
						background: "var(--color-surface)",
						boxShadow: "var(--shadow-sm)",
					}}
				>
					<div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
						<div className="field">
							<label htmlFor="c-name">Name</label>
							<input className="input" id="c-name" name="name" type="text" placeholder="Your name" required />
						</div>
						<div className="field">
							<label htmlFor="c-email">Email</label>
							<input className="input" id="c-email" name="email" type="email" placeholder="you@company.com" required />
						</div>
					</div>
					<div className="field">
						<label htmlFor="c-subject">Subject</label>
						<input className="input" id="c-subject" name="subject" type="text" placeholder="What's this about?" required />
					</div>
					<div className="field">
						<label htmlFor="c-message">Message</label>
						<textarea
							className="input"
							id="c-message"
							name="message"
							rows={6}
							placeholder="Tell me about the project, the team, the timing."
							required
						/>
					</div>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}>
						<span style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{status}</span>
						<button
							className="btn btn-primary"
							data-magnetic
							type="submit"
							style={{ fontSize: 13, padding: "var(--space-4) var(--space-8)", minHeight: 44 }}
						>
							Send message
						</button>
					</div>
				</form>
			</div>

			<style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
		</section>
	);
}
