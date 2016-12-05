unit ControllersBase;

interface

uses
  MVCFramework, CustomersServices, CustomersTDGU;

type
  TBaseController = class abstract(TMVCController)
  strict private
    FDM: TCustomersTDG;
    FCustomersService: TCustomersService;
    function GetDataModule: TCustomersTDG;
  strict protected
    function GetCustomersService: TCustomersService;
  public
    destructor Destroy; override;

  end;

implementation

uses
  System.SysUtils;

{ TBaseController }

destructor TBaseController.Destroy;
begin
  FCustomersService.Free;
  FDM.Free;
  inherited;
end;

function TBaseController.GetCustomersService: TCustomersService;
begin
  if not Assigned(FCustomersService) then
    FCustomersService := TCustomersService.Create(GetDataModule);
  Result := FCustomersService;
end;

function TBaseController.GetDataModule: TCustomersTDG;
begin
  if not Assigned(FDM) then
    FDM := TCustomersTDG.Create(nil);
  Result := FDM;
end;

end.
