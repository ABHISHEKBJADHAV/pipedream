import { axios } from "@pipedream/platform";
import constants from "./common/common.constants.mjs";
import { chainQueryString } from "./common/common.util.mjs";

export default {
  type: "app",
  app: "xero_accounting_api",
  propDefinitions: {
    tenant_id: {
      type: "string",
      label: "Tenant ID",
      description:
        "Id of the organization tenant to use on the Xero Accounting API.  See [Get Tenant Connections](https://pipedream.com/@sergio/xero-accounting-api-get-tenant-connections-p_OKCzOgn/edit) for a workflow example on how to pull this data.",
    },
  },
  methods: {
    getHeader(tenant_id) {
      return {
        Authorization: `Bearer ${this.$auth.oauth_access_token}`,
        "xero-tenant-id": tenant_id,
      };
    },
    async createContact(tenant_id, data) {
      return await axios(this.$auth, {
        method: "post",
        url: constants.CONTACT_API,
        headers: this.getHeader(tenant_id),
        data,
      });
    },
    async getContact(tenant_id, queryParam) {
      const newQueryParam = chainQueryString(queryParam);
      return await axios(this.$auth, {
        method: "get",
        url: `${constants.CONTACT_API}?Where=${newQueryParam}`,
        headers: this.getHeader(tenant_id),
      });
    },
    async createInvoice(tenant_id, data) {
      return await axios(this.$auth, {
        method: "post",
        url: constants.INVOICE_API,
        headers: this.getHeader(tenant_id),
        data,
      });
    },
    async getInvoice(tenant_id, queryParam) {
      const newQueryParam = chainQueryString(queryParam);
      return await axios(this.$auth, {
        url: `${constants.INVOICE_API}?Where=${newQueryParam}`,
        headers: this.getHeader(tenant_id),
      });
    },
  },
};
