export class AphHelpModel {
  public message = '';
  public case_info = new case_info();
}

class case_info {
  public user_id = '';
  public case_id = '';
  public partition_key = '';
}
