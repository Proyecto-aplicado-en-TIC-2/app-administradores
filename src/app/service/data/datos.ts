export let ListReportedEmergencies: {
  partition_key: string;
  reporter: {
    id: string;
    names: string;
    lastNames: string;
    relationshipWithTheUniversity: string;
  };
  location: {
    block: string;
    classroom: number;
    pointOfReference: string;
  };
}[] = [];
