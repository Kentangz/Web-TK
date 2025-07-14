export function getAllOutput() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/output`)
    .then(response => {
      if (!response.ok) throw new Error(`Gagal memuat data output yang dihasilkan. Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      return result.data.map(output => ({
        id: output.id,   
        output: output.output_description
      }));
    })
    .catch(error => {
      console.error("Kesalahan getAllOutput:", error);
      return null;
    });
}

export function getOutputById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/output/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data output yang dihasilkan. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const output = result.data;
      if (!output) {
        throw new Error("Data output yang dihasilkan tidak ditemukan");
      }
      return {
        id: output.id,   
        output: output.output_description
      };
    })
    .catch(error => {
      console.error("Kesalahan getOutputById:", error);
      return null;
    });
}

export function postOutput({ output_description }) {
  const formData = new FormData();
  formData.append('output_description', output_description);

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/output`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal menambahkan data output yang dihasilkan. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const output = result.data;
			return {
				id: output.id,
				output: output.output_description,
			};
		})
		.catch((error) => {
			console.error("Kesalahan postOutput:", error);
			return null;
		});
}

export function updateOutputById(id, { output_description }) {
  const formData = new FormData();
  formData.append('output_description', output_description);
  formData.append('_method', 'PUT');

  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/output/${id}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		body: formData,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Gagal memperbarui data output yang dihasilkan. Status: ${response.status}`
				);
			}
			return response.json();
		})
		.then((result) => {
			const output = result.data;
			return {
				id: output.id,
				output: output.output_description,
			};
		})
		.catch((error) => {
			console.error("Kesalahan updateOutputById:", error);
			return null;
		});
}

export function deleteOutputById(id) {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/output/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Gagal menghapus data output yang dihasilkan. Status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			console.error("Kesalahan deleteOutputById:", error);
			return null;
		});
}