import { TableCellProperties, TableCellVariantValue } from '../types';

// Define the registry structure
type TableCellState = {
  [key: string]: string; // Component keys for each state
};

type TableCellVariant = {
  [key in TableCellVariantValue]?: TableCellState;
};

type TableCellPosition = {
  [key: string]: TableCellVariant; // left, intermediate, right
};

type TableCellType = {
  [key: string]: TableCellPosition; // header, cell
};

// Initialize the registry with component keys
export const tableCellRegistry: TableCellType = {
  header: {
    left: {
      text: {
        default: "8119c24490d41a513c738bc99d6635556eb680d5",
        hover: "9c59ae635504868a2f761d3c6cd514f5359c2c6c"
      },
      checkbox: {
        default: "36411e0155216c9d1b34c891bcb14a5cf87a7a67",
        hover: "a653727a242e3a26cee656bc0f378eb311e608a4"
      },
      spacer: {
        default: "ad63c39fe00d7ff4d67295534fd39d26a9a3e5f6"
      }
    },
    intermediate: {
      text: {
        default: "bea490ed0f7386a3d5bf9d1bb4d74e22659e91b3",
        hover: "180061bc06c25e619933404c73b821283a1c8fc4"
      },
      checkbox: {
        default: "6dfb2960d3eecd4b46e8390d2e973936e9e6a1e3",
        hover: "7e9800cec321068feb38daad58812f2b42a95c09"
      },
      spacer: {
        default: "b96991c07d664b4e86915aa2c33abdea5e5da609"
      }
    },
    right: {
      text: {
        default: "b63c361889870a6de917e9fffdf17a3d7dfdc51a",
        hover: "57588e1e8632a26a970931e9f02604716c3244d7"
      },
      spacer: {
        default: "2f28e0a46b9c97659f67ef3baacb06f3a3b3c4bc"
      },
      CustomiseColumn: {
        default: "a70b3dd66662120f98298d802b488034ff60d8fd",
        hover: "9ffb054b91ac1b7f258c7b48ffe8626bae65fe6f",
        active: "d3951e7e2088a15e654f13bf93d5099b62bd2923"
      }
    }
  },
  cell: {
    left: {
      text: {
        default: "ed079aeaba0b5376f2727d244e20ed904fd65beb",
        hover: "0e81c41d53d8aa2d57f0a00e554e8190c4dd9132"
      },
      amount: {
        default: "8bc7a0dba69109ead6807999c4de836e8b1b78c1",
        hover: "16098bd2006d041bde8de3aa23a7b4842115d021"
      },
      date: {
        default: "27cbaed7b6f91af7754ce38864bfa9df25bf8701",
        hover: "3455fd8b500e1c10d912330dddceca1510450f46"
      },
      tag: {
        default: "d844d69ae3b17d227abf0218119ea7d2b3c6573c",
        hover: "261181e92f06a6690ce6b5c80dc7a7c3f163d607"
      },
      icon: {
        default: "6e6864ade800c1f6bb11b6a4c93922075aa34fa9",
        hover: "4249b9c86855fbc069ea0370de54039d49825e51"
      },
      checkbox: {
        default: "b2498ee37331252a44b2fdfb43abe8533d7b19fe",
        hover: "c4dcc3c3b0000170f740a5b14a5e208b785ff540"
      },
      spacer: {
        default: "85079ed8f742b89a667886331ec907b09ff1660b",
        hover: "f9385f3566a256bea6f0f9394473587abbc26fc5"
      },
      user: {
        default: "eb4b8b0347002e24112fc84f9b86bd73b9a5fabc",
        hover: "63e489f7ec674c287f33a46c706628cf0073c931"
      }
    },
    intermediate: {
      text: {
        default: "50dc229f2f4ccbb58a97dbb6d7e7cba68cd43dd5",
        hover: "d21ff6c101eb303aef067220e7e2ad1dab0913fb"
      },
      amount: {
        default: "e5b75bb377951a5036967c9e516573e180a4d4c0",
        hover: "aa662217f57a39cdbf657664be4d0e5500b03169"
      },
      date: {
        default: "a06d3f4e8d213f238e982722526cc5a0f3938851",
        hover: "ac29fdab3655862e4347d88f138199df2ffab6c0"
      },
      tag: {
        default: "ceeb503ad46397226ae9960118e9287baa784da6",
        hover: "6ac62da76a823eec0c1d15ef56f2ae2902e913a1"
      },
      icon: {
        default: "a718ddacd5a2463390f0b0c42361b31050078241",
        hover: "3664d84a0299f639a26197e7c5e2c2270cc0c9ba"
      },
      checkbox: {
        default: "c292e967330b3ccb4d04e7c0407ca4d4263ff314",
        hover: "dd85216592388f82ec79f7b4f965d2f918439ff6"
      },
      spacer: {
        default: "daed6fe05356b9f799c1d41a91dd58a82031062e",
        hover: "5da964db8480059b7742cb21c8a9d2b1a0129d7f"
      },
      user: {
        default: "4023673df7e8af5c2ae1b9e1485118305e8f2948",
        hover: "0b738aae710de3051532bf7d7cd7cabf11ee4a89"
      }
    },
    right: {
      text: {
        default: "ba1d6a04b098e36b2e1ad8a86b48c024c8f4bfc4",
        hover: "3a2485d11c40e6573bcb4bbaa393d82d05f86303"
      },
      amount: {
        default: "8e7a2d4e8e648af27781760afe39b58eb4729488",
        hover: "5c5472ad80c454c2e92be563726baf4b5801d0b1"
      },
      date: {
        default: "ab7835eb8817600c5d9ad6172e1b4906729c84e6",
        hover: "5bdd2337c957de335a7871a32b6990e34feeb99f"
      },
      tag: {
        default: "a8616f7e89e4143747999f22a4521aab1266c3d3",
        hover: "6ef055d3cf7afa1803fc22be8ecf5a1ebb9402c0"
      },
      icon: {
        default: "06cd459a5d04991e8669c7224900ecee05481231",
        hover: "871d00b97f0a582d90753df0d0a82cb882384c22"
      },
      checkbox: {
        default: "ea6f5d056538189fc8dc6d5b7fcea450fca28a19",
        hover: "7f96ca30a3804764a4414ff61ea72b4549f3d68b"
      },
      spacer: {
        default: "ec5bab0d3bb8c4619d5b44c9da2249c119baf367",
        hover: "66f156d71217e997a8daa794cb3ec6cd46074d0a"
      },
      user: {
        default: "658c7aff1b26ed7b3bed105e3a9e9f4b923df2c7",
        hover: "e7d73b0a0fd85506986dddfa3e2bc36c1bbe70ca"
      }
    }
  }
};

// Helper function to get the component key for a table cell
export function getTableCellKey(props: TableCellProperties): string {
  const type = props.type;
  const position = props.position;
  const variant = props.variant;
  const state = props.state;

  try {
    const variantObj = tableCellRegistry[type][position][variant];
    if (!variantObj) {
      throw new Error(`Invalid variant ${variant} for position ${position} and type ${type}`);
    }
    const key = variantObj[state];
    if (!key) {
      throw new Error(`Invalid state ${state} for variant ${variant}, position ${position}, and type ${type}`);
    }
    return key;
  } catch (error) {
    console.error(`Invalid table cell properties: ${JSON.stringify(props)}`);
    throw new Error(`Could not find component key for table cell with properties: ${JSON.stringify(props)}`);
  }
}

// Helper function to create table cell properties
export function createTableCellProperties(props: Partial<TableCellProperties>): TableCellProperties {
  return {
    type: props.type || "cell",
    position: props.position || "left",
    variant: props.variant || TableCellVariantValue.Text,
    state: props.state || "default",
    "Header Content": props["Header Content"],
    "Cell Content - Text": props["Cell Content - Text"],
    "Cell Content - Amount": props["Cell Content - Amount"],
    "Cell Content - Date": props["Cell Content - Date"],
    "Cell Content - Tag": props["Cell Content - Tag"],
    "Cell Content - User": props["Cell Content - User"],
    "Has Cell Icon 1": props["Has Cell Icon 1"] || false,
    "Has Cell Icon 2": props["Has Cell Icon 2"] || false,
    "Has Cell Icon 3": props["Has Cell Icon 3"] || false,
    "Has Cell Icon More": props["Has Cell Icon More"] || false,
    "Has Filter": props["Has Filter"] || false
  };
} 