const WORKER_URL = 'https://autumn-river-2b6b.mathisdelauriere.workers.dev';
const API_SECRET = 'EEHC_VPS_ecc0bbbdcced40552a76ecc3dc6e1c27f546859060f31a3c';

async function vpsFetch(path, options = {}) {
    try {
        const url = `${WORKER_URL}${path}`;
        const headers = {
            'x-api-secret': API_SECRET,
            'Content-Type': 'application/json',
            ...options.headers
        };
        const res = await fetch(url, { ...options, headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error(`VPS Sync Error [${path}]:`, e);
        return null;
    }
}

const VPSSync = {
    // REVIEWS
    async getReviews() {
        const revs = await vpsFetch('/reviews');
        return revs || [];
    },
    async postReview(name, rating, details) {
        return await vpsFetch('/reviews', {
            method: 'POST',
            body: JSON.stringify({ name, rating, details })
        });
    },
    async featureReview(id, token) {
        return await vpsFetch(`/reviews/${id}/feature`, {
            method: 'POST',
            headers: { 'x-admin-token': token }
        });
    },
    async deleteReview(id, token) {
        return await vpsFetch(`/reviews/${id}`, {
            method: 'DELETE',
            headers: { 'x-admin-token': token }
        });
    },

    // REPORTS
    async getReports() {
        const reports = await vpsFetch('/reports');
        return reports || [];
    },
    async getReportHtml(id) {
        try {
            const res = await fetch(`${WORKER_URL}/reports/${id}/html`, {
                headers: { 'x-api-secret': API_SECRET }
            });
            if (!res.ok) return null;
            return await res.text();
        } catch (e) {
            console.error("VPS Sync Error [Report HTML]:", e);
            return null;
        }
    },
    async postReport(reportData, token) {
        return await vpsFetch('/reports', {
            method: 'POST',
            headers: { 'x-admin-token': token },
            body: JSON.stringify(reportData)
        });
    }
};
