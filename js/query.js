var query = {
  "name": "Gene_Orth",
  "title": "Gene --> Orthologues",
  "from": "Gene",
  "select": [
    "primaryIdentifier",
    "symbol",
    "homologues.homologue.primaryIdentifier",
    "homologues.homologue.symbol",
    "homologues.homologue.organism.shortName",
    "homologues.evidence.evidenceCode.name",
    "homologues.dataSets.name"
  ],
  "orderBy": [
    {
      "path": "symbol",
      "direction": "ASC"
    }
  ],
  "where": [
    {
      "path": "Gene",
      "op": "LOOKUP",
      "value": "cdc2",
      "code": "A",
      "editable": true,
      "switched": "LOCKED",
      "switchable": false
    }
  ]
};

module.exports = query;
