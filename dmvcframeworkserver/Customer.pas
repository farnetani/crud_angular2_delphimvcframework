unit Customer;

interface

uses
  ObjectsMappers;

type
  TBaseBO = class
  private
    FID: Integer;
    procedure SetID(const Value: Integer);
  public
    procedure CheckInsert; virtual;
    procedure CheckUpdate; virtual;
    procedure CheckDelete; virtual;
    property ID: Integer read FID write SetID;
  end;

  [MapperJSONNaming(JSONNameLowerCase)]
  TCustomer = class(TBaseBO)
  private
    FFirst_Name: string;
    FLast_Name: string;
    FAge: integer;

    procedure SetFirst_name(const Value: string);
    procedure SetLast_name(const Value: string);
    procedure SetAge(const Value:integer);
  public
    procedure CheckInsert; override;
    procedure CheckUpdate; override;
    procedure CheckDelete; override;

    [MapperColumn('First_Name')]
    property First_Name: string read FFirst_Name write SetFirst_Name;
    [MapperColumn('Last_Name')]
    property Last_Name: string read FLast_Name write SetLast_Name;
    [MapperColumn('Age')]
    property Age: integer read FAge write SetAge;
   end;

implementation

uses
  System.SysUtils;

{ TBaseBO }

procedure TBaseBO.CheckDelete;
begin

end;

procedure TBaseBO.CheckInsert;
begin

end;

procedure TBaseBO.CheckUpdate;
begin

end;

procedure TBaseBO.SetID(const Value: Integer);
begin
  FID := Value;
end;

{ TCustomer }

procedure TCustomer.CheckDelete;
begin
  inherited;
  if age > 50 then
    raise Exception.Create('Cannot delete an customer with a age greater than 50 years (yes, it is a silly check)');
end;

procedure TCustomer.CheckInsert;
begin
  inherited;
  if length(First_Name) < 3 then
    raise Exception.Create('First Name cannot be less than 3 chars');
end;

procedure TCustomer.CheckUpdate;
begin
  inherited;
  if length(First_Name) < 3 then
    raise Exception.Create('First Name cannot be less than 3 chars');
end;

procedure TCustomer.SetFirst_Name(const Value: string);
begin
  FFirst_Name := Value;
end;

procedure TCustomer.SetLast_Name(const Value: string);
begin
  FLast_Name := Value;
end;

procedure TCustomer.SetAge(const Value: integer);
begin
  FAge := Value;
end;


end.
