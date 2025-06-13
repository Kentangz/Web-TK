export const authStyles = {
	// Session Warning Notification
	sessionWarning: {
		width: "min(400px, 90vw)",
		position: "center-top",
		distance: "10px",
		opacity: 0.9,
		borderRadius: "12px",
		backOverlay: false,
		clickToClose: true,
		cssAnimationDuration: 700,
		cssAnimationStyle: "from-top",
		closeButton: true,
		useIcon: true,
		childClassName: "notiflix-notify-warning",
		plainText: false,
	},

	// Session Expired Dialog
	sessionExpired: {
		width: "min(440px, 90vw)",
		backgroundColor: "#ffffff",
		animationIn: "flipInX",
		animationOut: "slideOutDown",
		svgSize: "0px",
		cssAnimationStyle: "flip",
	},

	loading: {
		backgroundColor: "#FFF9F9", 
		svgSize: "100px", 
		svgColor: "#0ea5e9", 
		messageID: "loadingMessage",
		messageFontSize: "24px",
		messageColor: "#0f172a",
		cssAnimationStyle: "zoomIn",
		cssAnimationDuration: 800,
		messageFontWeight: "bold", 
		borderRadius: "16px"
	},
};

export const authTemplates = {
	sessionExpired: (formatTime) => `
    <div style="text-align: center; padding: 20px;">
      <div>🕒</div>
      <p>Waktu sesi telah habis</p>
      <div>
				<p>Berakhir pada: ${formatTime}.</p>
      </div>
      <p>Demi keamanan akun, silakan login ulang untuk melanjutkan aktivitas.</p>
    </div>
  `,

	sessionWarning: (remainingTime) =>
		`<span style="color: #000;">Sesi akan berakhir dalam ${remainingTime} menit. Segera simpan pekerjaan Anda</span>`,
};

export const authMessages = {
	titles: {
		sessionExpired: "🔒 Sesi Berakhir",
		loading: "Mengalihkan ke halaman login...",
	},

	buttons: {
		loginAgain: "Login Ulang",
	},
};
