import "./style.css";
import { createLogoutHandler } from "../../Auth/Api/Logout/logoutHandler.js";

export function createSidebarHTML(options = {}) {
	const {
		logoSrc = "/logo.svg",
		schoolName = "TK & KB SITI HAJAR",
		activePage = "dashboard",
	} = options;

	return `
    <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle Sidebar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <div class="sidebar" id="sidebar">
      <button class="sidebar-close" id="sidebarClose" aria-label="Close Sidebar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="logo-container">
        <img src="${logoSrc}" alt="Logo" class="logo" />
        <h2>${schoolName}</h2>
      </div>
      
      <ul>
        ${createSidebarItem("dashboard", "Dashboard", activePage)}

        ${createDropdown(
					"beranda",
					"Beranda",
					[
						{ id: "visi-misi", label: "Visi & Misi" },
						{ id: "tujuan-strategi", label: "Tujuan & Strategi" },
						{ id: "gallery-beranda", label: "Gallery" },
					],
					activePage
				)}

        ${createDropdown(
					"program-sekolah",
					"Program Sekolah",
					[
						{ id: "kegiatan-unggulan", label: "Kegiatan Unggulan" },
						{ id: "galeri-kegiatan", label: "Galeri Kegiatan" },
						{ id: "kegiatan-penunjang", label: "Kegiatan Penunjang" },
						{ id: "output", label: "Output Yang Dihasilkan" },
						{ id: "kurikulum-plus", label: "Kurikulum Plus" },
					],
					activePage
				)}

        ${createDropdown(
					"fasilitas-prestasi",
					"Fasilitas & Prestasi",
					[
						{ id: "fasilitas", label: "Fasilitas" },
						{ id: "galeri-fasilitas", label: "Galeri Fasilitas" },
						{ id: "prestasi", label: "Prestasi" },
						{ id: "galeri-prestasi", label: "Galeri Prestasi" },
					],
					activePage
				)}

        ${createDropdown(
					"jadwal",
					"Jadwal TK & KB",
					[
						{ id: "jadwal-a-b", label: "Kelompok A & B" },
						{ id: "kelompok-bermain", label: "Kelompok Bermain" },
					],
					activePage
				)}

        ${createSidebarItem("guru", "Guru", activePage)}
        ${createSidebarItem("contact", "Contact", activePage)}
      </ul>
      
      <div class="logout-container">
        <button class="logout-btn" id="logoutBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  `;
}

const basePath = "/admin-tkkb-sitihajar-karlos";
const paths = {
	beranda: "/beranda",
	programSekolah: "/program-sekolah",
	fasilitas: "/fasilitas-prestasi",
	jadwal: "/jadwal",
};

const pageMap = {
	dashboard: `${basePath}/dashboard`,
	guru: `${basePath}/guru`,
	contact: `${basePath}/contact`,

	"visi-misi": `${basePath}${paths.beranda}/visi-misi`,
	"tujuan-strategi": `${basePath}${paths.beranda}/tujuan-strategi`,
	"gallery-beranda": `${basePath}${paths.beranda}/gallery-beranda`,

	"kegiatan-unggulan": `${basePath}${paths.programSekolah}/kegiatan-unggulan`,
	"galeri-kegiatan": `${basePath}${paths.programSekolah}/galeri-kegiatan`,
	"kegiatan-penunjang": `${basePath}${paths.programSekolah}/kegiatan-penunjang`,
	output: `${basePath}${paths.programSekolah}/output`,
	"kurikulum-plus": `${basePath}${paths.programSekolah}/kurikulum-plus`,

	fasilitas: `${basePath}${paths.fasilitas}/fasilitas`,
	"galeri-fasilitas": `${basePath}${paths.fasilitas}/galeri-fasilitas`,
	prestasi: `${basePath}${paths.fasilitas}/prestasi`,
	"galeri-prestasi": `${basePath}${paths.fasilitas}/galeri-prestasi`,

	"jadwal-a-b": `${basePath}${paths.jadwal}/jadwal-a-b`,
	"kelompok-bermain": `${basePath}${paths.jadwal}/kelompok-bermain`,
};

function createSidebarItem(id, label, activePage) {
	const isActive = activePage === id ? "active" : "";
	const href = pageMap[id] || "#";
	return `<li class="${isActive}"><a href="${href}" data-id="${id}">${label}</a></li>`;
}

function createDropdown(id, label, items, activePage) {
	const isOpen = items.some((item) => item.id === activePage);
	const isActiveGroup = isOpen ? "active" : "";

	const subItems = items
		.map((item) => {
			const isActive = activePage === item.id ? "active" : "";
			const href = pageMap[item.id] || "#";
			return `<li class="${isActive}"><a href="${href}" data-id="${item.id}">${item.label}</a></li>`;
		})
		.join("");

	return `
    <li class="dropdown ${isOpen ? "open" : ""} ${isActiveGroup}">
      <div class="dropdown-title" data-group="${id}">${label}</div>
      <ul>
        ${subItems}
      </ul>
    </li>
  `;
}

export function initResponsiveSidebar() {
	const sidebar = document.getElementById("sidebar");
	const sidebarToggle = document.getElementById("sidebarToggle");
	const sidebarClose = document.getElementById("sidebarClose");
	const sidebarOverlay = document.getElementById("sidebarOverlay");

	if (!sidebar || !sidebarToggle || !sidebarClose || !sidebarOverlay) {
		console.warn("Sidebar elements not found");
		return;
	}

	function toggleSidebar() {
		const isActive = sidebar.classList.toggle("active");
		sidebarOverlay.classList.toggle("active", isActive);

		if (window.innerWidth <= 768) {
			document.body.style.overflow = isActive ? "hidden" : "";
			sidebarToggle.style.display = isActive ? "none" : "inline-flex";
		}
	}

	function closeSidebar() {
		sidebar.classList.remove("active");
		sidebarOverlay.classList.remove("active");
		document.body.style.overflow = "";
		if (window.innerWidth <= 768) {
			sidebarToggle.style.display = "inline-flex";
		}
	}

	sidebarToggle.addEventListener("click", toggleSidebar);
	sidebarClose.addEventListener("click", closeSidebar);
	sidebarOverlay.addEventListener("click", closeSidebar);

	const navLinks = sidebar.querySelectorAll("a[href]");
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (window.innerWidth <= 768) {
				closeSidebar();
			}
		});
	});

	function handleResize() {
		if (window.innerWidth > 768) {
			sidebar.classList.remove("active");
			sidebarOverlay.classList.remove("active");
			document.body.style.overflow = "";
			sidebarToggle.style.display = "none";
		} else {
			sidebarToggle.style.display = "inline-flex";
		}
	}

	window.addEventListener("resize", handleResize);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && sidebar.classList.contains("active")) {
			closeSidebar();
		}
	});

	document.addEventListener("click", (e) => {
		if (
			window.innerWidth <= 768 &&
			sidebar.classList.contains("active") &&
			!sidebar.contains(e.target) &&
			!sidebarToggle.contains(e.target)
		) {
			closeSidebar();
		}
	});

	if (window.innerWidth <= 768) {
		sidebarToggle.style.display = "inline-flex";
	} else {
		sidebarToggle.style.display = "none";
	}
}

export function initSidebarFunctionality() {
	const dropdowns = document.querySelectorAll(".sidebar .dropdown");
	initResponsiveSidebar();
	const savedGroup = localStorage.getItem("openDropdown");
	if (savedGroup) {
		const target = document.querySelector(
			`.dropdown-title[data-group="${savedGroup}"]`
		);
		if (target) {
			target.parentElement.classList.add("open");
		}
	}

	dropdowns.forEach((dropdown) => {
		const title = dropdown.querySelector(".dropdown-title");
		title.addEventListener("click", function () {
			const isOpen = dropdown.classList.contains("open");

			dropdowns.forEach((d) => {
				if (d !== dropdown) d.classList.remove("open");
			});

			dropdown.classList.toggle("open");

			if (!isOpen) {
				localStorage.setItem("openDropdown", title.dataset.group);
			} else {
				localStorage.removeItem("openDropdown");
			}
		});
	});

	const allLinks = document.querySelectorAll(".sidebar a");
	allLinks.forEach((link) => {
		link.addEventListener("click", () => {
			const parentDropdown = link.closest(".dropdown");
			if (parentDropdown) {
				const groupId =
					parentDropdown.querySelector(".dropdown-title").dataset.group;
				localStorage.setItem("openDropdown", groupId);
			} else {
				localStorage.removeItem("openDropdown");
			}
		});
	});

	createLogoutHandler();
}

export function createSidebar(options = {}) {
	const html = createSidebarHTML(options);
	return {
		html,
		mount(target = document.body) {
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = html.trim();
			while (tempDiv.firstChild) {
				target.appendChild(tempDiv.firstChild);
			}
			initSidebarFunctionality();
			return this;
		},
	};
}

export function adjustMainContentForSidebar() {
	const mainContent = document.querySelector(".main-content");
	if (mainContent) {
		if (window.innerWidth > 768) {
			mainContent.style.marginLeft = "320px";
		} else {
			mainContent.style.marginLeft = "0";
		}
	}
}
if (typeof window !== "undefined") {
	window.addEventListener("load", adjustMainContentForSidebar);
	window.addEventListener("resize", adjustMainContentForSidebar);
}
