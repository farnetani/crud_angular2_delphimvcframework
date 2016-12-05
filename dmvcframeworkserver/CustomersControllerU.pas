unit CustomersControllerU;

interface

uses
  MVCFramework, CustomersTDGU, ControllersBase;

type

  [MVCPath('/api')]
  TCustomersController = class(TBaseController)
  private
    FCustomersTDG: TCustomersTDG;
  protected
    function GetDAL: TCustomersTDG;
    procedure MVCControllerBeforeDestroy; override;
  public
    [MVCPath('/customers')]
    [MVCHTTPMethod([httpGET])]
    procedure GetCustomers;

    [MVCPath('/customers/($ID)')]
    [MVCHTTPMethod([httpGET])]
    procedure GetCustomer(const ID: UInt64);

    [MVCDoc('Updates the customer with the specified id and return "200: OK"')]
    [MVCPath('/customers/($id)')]
    [MVCHTTPMethod([httpPUT])]
    procedure UpdateCustomerByID(id: Integer);

    [MVCDoc('Creates a new customer and returns "201: Created"')]
    [MVCPath('/customers')]
    [MVCHTTPMethod([httpPOST])]
    procedure CreateCustomer(Context: TWebContext);

    [MVCDoc('Deletes the customer with the specified id')]
    [MVCPath('/customers/($id)')]
    [MVCHTTPMethod([httpDelete])]
    procedure DeleteCustomerByID(id: Integer);

    procedure OnBeforeAction(Context: TWebContext; const AActionName: string;
      var Handled: Boolean); override;
    procedure OnAfterAction(Context: TWebContext; const AActionName: string); override;

end;

implementation

{ TCustomersController }

uses CustomersServices, Customer, Commons, mvcframework.Commons;

procedure TCustomersController.CreateCustomer(Context: TWebContext);
var
  Customer: TCustomer;
begin
  Customer := Context.Request.BodyAs<TCustomer>;
  try
    GetCustomersService.Add(Customer);
    Render(201, 'Customer Created');
  finally
    Customer.Free;
  end;
end;

procedure TCustomersController.UpdateCustomerByID(id: Integer);
var
  Customer: TCustomer;
begin
  Customer := Context.Request.BodyAs<TCustomer>;
  try
    Customer.id := Context.Request.ParamsAsInteger['id'];
    GetCustomersService.Update(Customer);
    Render(200, 'Customer Updated');
  finally
    Customer.Free;
  end;
end;

procedure TCustomersController.DeleteCustomerByID(id: Integer);
var
  Customer: TCustomer;
begin
  GetCustomersService.StartTransaction;
  try
    Customer := GetCustomersService.GetByID
      (Context.Request.ParamsAsInteger['id']);
    try
      GetCustomersService.Delete(Customer);
    finally
      Customer.Free;
    end;
    GetCustomersService.Commit;
    Render(200, 'Customer deleted!');
  except
    GetCustomersService.Rollback;
    raise;
  end;
end;

procedure TCustomersController.GetCustomer(const ID: UInt64);
begin
  Render(GetDAL.GetCustomerById(ID), true, true);
end;

procedure TCustomersController.GetCustomers;
begin
  Render(GetDAL.GetCustomers, true);
end;

function TCustomersController.GetDAL: TCustomersTDG;
begin
  if not Assigned(FCustomersTDG) then
    FCustomersTDG := TCustomersTDG.Create(nil);
  Result := FCustomersTDG;
end;

procedure TCustomersController.MVCControllerBeforeDestroy;
begin
  inherited;
  FCustomersTDG.Free;
end;

procedure TCustomersController.OnAfterAction(Context: TWebContext; const AActionName: string);
begin
  { Executed after each action }
  inherited;
end;

procedure TCustomersController.OnBeforeAction(Context: TWebContext; const AActionName: string;
  var Handled: Boolean);
begin
  { Executed before each action
    if handled is true (or an exception is raised) the actual
    action will not be called }
  inherited;
end;

end.
