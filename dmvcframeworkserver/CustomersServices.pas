unit CustomersServices;

interface

uses
  System.Generics.Collections, Customer, CustomersTDGU, System.SysUtils, Commons;

type

  TServiceBase = class abstract
  strict protected
    FDM: TCustomersTDG;
  public
    constructor Create(DM: TCustomersTDG); virtual;
    procedure Commit;
    procedure Rollback;
    procedure StartTransaction;
  end;

  TCustomersService = class(TServiceBase)
  public
    function GetAll: TObjectList<TCustomer>;
    function GetByID(const AID: Integer): TCustomer;
    procedure Delete(Customer: TCustomer);
    procedure Add(Customer: TCustomer);
    procedure Update(Customer: TCustomer);
  end;

implementation

uses
  ObjectsMappers, FireDAC.Stan.Option, FireDAC.Comp.Client, FireDAC.Stan.Param;

{ TArticoliService }

procedure TCustomersService.Add(Customer: TCustomer);
var
  Cmd: TFDCustomCommand;
begin
  Customer.CheckInsert;
  Cmd := FDM.updCustomers.Commands[arInsert];
  Mapper.ObjectToFDParameters(Cmd.Params, Customer, 'NEW_');
  Cmd.OpenOrExecute;
end;

procedure TCustomersService.Delete(Customer: TCustomer);
var
  Cmd: TFDCustomCommand;
begin
  Customer.CheckDelete;
  Cmd := FDM.updCustomers.Commands[arDelete];
  Mapper.ObjectToFDParameters(Cmd.Params, Customer, 'OLD_');
  Cmd.Execute;
end;

function TCustomersService.GetAll: TObjectList<TCustomer>;
begin
  FDM.dsCustomers.Open('SELECT * FROM CUSTOMERS ORDER BY ID');
  Result := FDM.dsCustomers.AsObjectList<TCustomer>;
  FDM.dsCustomers.Close;
end;

function TCustomersService.GetByID(const AID: Integer): TCustomer;
begin
  Result := nil;
  FDM.dsCustomers.Open('SELECT * FROM CUSTOMERS WHERE ID = :ID', [AID]);
  try
    if not FDM.dsCustomers.Eof then
      Result := FDM.dsCustomers.AsObject<TCustomer>
    else
      raise EServiceException.Create('Customer not found');
  finally
    FDM.dsCustomers.Close;
  end;
end;

procedure TCustomersService.Update(Customer: TCustomer);
var
  Cmd: TFDCustomCommand;
begin
  Customer.CheckUpdate;
  Cmd := FDM.updCustomers.Commands[arUpdate];
  Mapper.ObjectToFDParameters(Cmd.Params, Customer, 'NEW_');
  Cmd.ParamByName('OLD_ID').AsInteger := Customer.ID;
  Cmd.Execute;
  if Cmd.RowsAffected <> 1 then
    raise Exception.Create('Customer not found');
end;

{ TServiceBase }

procedure TServiceBase.Commit;
begin
  FDM.fdConnection1.Commit;
end;

constructor TServiceBase.Create(DM: TCustomersTDG);
begin
  inherited Create;
  FDM := DM;
end;

procedure TServiceBase.Rollback;
begin
  FDM.fdConnection1.Rollback;
end;

procedure TServiceBase.StartTransaction;
begin
  FDM.fdConnection1.StartTransaction;
end;

end.
